"""
Contains functionality for creating  PyTorch Dataloaders
for image segmentaion
"""

import os
import random

from torchvision import transforms
import torchvision.transforms.functional as TF
from torch.utils.data import DataLoader
from torch.utils.data import Dataset
from sklearn.model_selection import train_test_split

import pandas as pd

from PIL import Image
from glob import glob

class MyDataset(Dataset):
    """
    A custom dataset class which applies identical transformations to the training and validation data
    """
    def __init__(self, image_paths, target_paths, train=True):
        self.image_paths = image_paths
        self.target_paths = target_paths

    def transform(self, image, mask):
        # Resize
        resize = transforms.Resize(size=(256, 256))
        image = resize(image)
        mask = resize(mask)

        # Random horizontal flipping
        if random.random() > 0.5:
            image = TF.hflip(image)
            mask = TF.hflip(mask)

        # Transform to tensor
        image = TF.to_tensor(image)
        mask = TF.to_tensor(mask)

        return image, mask

    def __getitem__(self, index):
        image = Image.open(self.image_paths[index])
        mask = Image.open(self.target_paths[index])
        x, y = self.transform(image, mask)
        return x, y

    def __len__(self):
        return len(self.image_paths)
    

def create_dataloaders(
        data_path:str,
        bs_train:int,
        bs_val:int,
        bs_test:int,
):
    """Creates training and testing DataLoaders.

  Takes in a training directory and testing directory path and turns
  them into PyTorch Datasets and then into PyTorch DataLoaders.

  Args:
    data_path: path to your images.
    bs_train: batch_size for training dataloader
    bs_val: batch size for validation data loader
    test_val: batch size for test dataloader

  Returns:
    A tuple of (train_dataloader, val_dataloader, test_dataloader).
  """
    
    #Create lists for the paths of training images and training masks
    train_files = []
    mask_files = glob(data_path)
    for i in mask_files:
        train_files.append(i.replace('_mask',''))

    #Create dataframes with paths for training, validation, and testing
    df = pd.DataFrame(data={"filename": train_files, 'mask' : mask_files})
    df_train, df_test = train_test_split(df,test_size = 0.1)
    df_train, df_val = train_test_split(df_train,test_size = 0.2)

    #Datasets
    train_dataset = MyDataset(df_train["filename"].values.tolist(), df_train["mask"].values.tolist())
    val_dataset = MyDataset(df_val['filename'].values.tolist(), df_val['mask'].values.tolist())
    test_dataset = MyDataset(df_test['filename'].values.tolist(), df_test["mask"].values.tolist())

    #Dataloaders
    train_dataloader = DataLoader(train_dataset, batch_size=bs_train, shuffle=True)
    val_dataloader = DataLoader(val_dataset, batch_size=bs_val, shuffle=True)
    test_dataloader = DataLoader(test_dataset, batch_size=bs_test, shuffle=True)

    return train_dataloader, val_dataloader, test_dataloader