"""
Trains PyTorch image segmentation model using device agnostic code
"""

import os
import torch

from config import NUM_EPOCHS, LEARNING_RATE, BS_TRAIN, BS_VAL, BS_TEST, PATH
import data_setup, engine, utils
from model import UNet

device = "cuda" if torch.cuda.is_available else "cpu"

train_dataloader, val_dataloader, test_dataloader = data_setup.create_dataloaders(
    data_path=PATH,
    bs_train=BS_TRAIN,
    bs_val=BS_VAL,
    bs_test=BS_TEST
)

model = UNet().to(device)

#Train the model
best_model, avg_train_losses, avg_val_losses = engine.fit(model, 
                                                          NUM_EPOCHS,
                                                          train_dataloader,
                                                          val_dataloader,
                                                          test_dataloader,
                                                          LEARNING_RATE)

utils.save_model(
    model=best_model,
    target_dir="best_model",
    model_name="BrainMRIBest.pth"
)