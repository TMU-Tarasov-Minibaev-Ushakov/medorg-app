"""
Trains a PyTorch image classification model using device-agnostic code
"""

import os
import torch
import data_setup, model, utils, engine

from config import NUM_EPOCHS, BATCH_SIZE, LEARNING_RATE, TRAIN_DIR, VAL_DIR, TEST_DIR

from torchvision import transforms

# Setup target device
device = "cuda" if torch.cuda.is_available else "cpu"


# Create transforms
data_transorms = transforms.Compose([transforms.Resize(255),
                                     transforms.CenterCrop(224),
                                     transforms.RandomHorizontalFlip(),
                                     transforms.RandomRotation(10),
                                     transforms.RandomGrayscale(),
                                     transforms.RandomAffine(translate=(0.05, 0.05), degrees=0),
                                     transforms.ToTensor(),
                                     transforms.Normalize(mean=[0.485, 0.456, 0.406],
                                            std=[0.229, 0.224, 0.225] ,inplace=True)
                                     ])


# Crete dataloaders with help from data_setup.py
train_dataloader, val_dataloader, test_dataloader, class_names = data_setup.create_dataloaders(
    train_dir=TRAIN_DIR,
    val_dir=VAL_DIR,
    test_dir=TEST_DIR,
    transform=data_transorms,
    batch_size=BATCH_SIZE
)


# move data parameters to right device
train_dataloader = utils.DeviceDataLoader(train_dataloader, device)
val_dataloader = utils.DeviceDataLoader(val_dataloader, device)
test_dataloader = utils.DeviceDataLoader(test_dataloader, device)

# Create model with help from model.py and move the model's parameters to right device
model = utils.to_device(model.PneumoniaResnet(), device)

weight_decay = 1e-4
grad_clip = None
opt_func = torch.optim.Adam
# weighted loss for data class imbalance
weight = torch.FloatTensor([3876/(1342+3876), 1342/(1342+3876)]).to(device)

# train model
history, optimizer, best_loss = engine.fit(NUM_EPOCHS, LEARNING_RATE, model, train_dataloader, val_dataloader, weight, 
                                    grad_clip=grad_clip, 
                                    weight_decay=weight_decay, 
                                    opt_func=opt_func)

# test in test dataset
preds, labels = engine.test_predict(model, test_dataloader)

# save the model
utils.save_model(
    model=model,
    target_dir="models",
    model_name="PneumoniaResNet.pth"
)
