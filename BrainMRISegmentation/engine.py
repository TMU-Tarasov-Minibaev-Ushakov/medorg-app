"""
Contains various training functions
"""

import torch
from tqdm.notebook import tqdm
import numpy as np
import matplotlib.pyplot as plt

from utils import dc_loss, save_model


def fit(model:torch.nn.Module, 
          epochs:int,
          train_dataloader:torch.utils.data.DataLoader,
          val_dataloader:torch.utils.data.DataLoader,
          test_dataloader:torch.utils.data.DataLoader,
          lr:float,
          optimizer = torch.optim.Adam,
          device = torch.device("cuda" if torch.cuda.is_available() else "cpu"),
          show_samples=False
          ):
    
    """
    Train your PyTorch segmentation model
    Args:
        model: your model,
        epochs: epochs for training ypur model,
        train_dataloader: dataloader with train data,
        val_dataloader: dataloader with validataion data,
        test_dataloader: dataloader with test data,
        lr: learning rate,
        optimizer: optimizer function, recommended to use Adam,
        device: gpu or cpu,
        show_samples: if true -> after each epoch show model's prediction on test data
    """
    optimizer = optimizer(model.parameters(), lr=lr, betas=(0.9,0.999))
    #Keep track of average training and validation losses for each epoch
    avg_train_losses = []
    avg_val_losses = []

    #Trigger for earlystopping
    earlystopping = False

    #Training loop
    for epoch in range(epochs):

        #Record the training and validation losses for each batch in this epoch
        train_losses = []
        val_losses = []

        model.train()

        loop = tqdm(enumerate(train_dataloader), total = len(train_dataloader), leave = False)
        for batch, (images, targets) in loop:

            images = images.to(device)
            targets = targets.to(device)

            model.zero_grad()
            pred = model(images)
            loss = dc_loss(pred, targets)
            loss.backward()
            optimizer.step()

            train_losses.append(loss.item())

            if show_samples:
                with torch.no_grad():
                    if batch == 1:
                        save_model(model, "models", "BrainMRIModel.pt")

                        model.eval()

                        (img, mask) = next(iter(test_dataloader))
                        img = img.to(device)
                        mask = mask.to(device)
                        mask = mask[0]
                        pred = model(img)

                        plt.figure(figsize=(12,12))
                        plt.subplot(1,3,1)
                        plt.imshow(np.squeeze(img.cpu().numpy()).transpose(1,2,0))
                        plt.title('Original Image')
                        plt.subplot(1,3,2)
                        plt.imshow((mask.cpu().numpy()).transpose(1,2,0).squeeze(axis=2), alpha=0.5)
                        plt.title('Original Mask')
                        plt.subplot(1,3,3)
                        plt.imshow(np.squeeze(pred.cpu()) > .5)
                        plt.title('Prediction')
                        plt.show()

                        model.train()


        model.eval()

        with torch.no_grad():     #Record and print average validation loss for each epoch
            for val_batch, (val_images, val_targets) in enumerate(val_dataloader):
                val_images = val_images.to(device)
                val_targets = val_targets.to(device)
                val_pred = model(val_images.detach())

                val_loss = dc_loss(val_pred, val_targets).item()

                val_losses.append(val_loss)

            epoch_avg_train_loss = np.average(train_losses)
            epoch_avg_val_loss = np.average(val_losses)
            avg_train_losses.append(epoch_avg_train_loss)
            avg_val_losses.append(epoch_avg_val_loss)

            print_msg = (f'train_loss: {epoch_avg_train_loss:.5f} ' + f'valid_loss: {epoch_avg_val_loss:.5f}')

            print(print_msg)

        if epoch > 5:     #Early stopping with a patience of 1 and a minimum of 5 epochs
            if avg_val_losses[-1]>=avg_val_losses[-2]:
                print("Early Stopping Triggered With Patience 1")
                save_model(model, "models", "BrainMRIModel.pt")
                earlystopping = True
        if earlystopping:
            break

    return  model, avg_train_losses, avg_val_losses