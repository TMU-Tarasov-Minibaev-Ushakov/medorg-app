###Pytorch-UNet-Brain-MRI
This is a UNet implementation in PyTorch using a modified version of the original UNet from the paper "U-Net: Convolutional Networks for Biomedical Image Segmentation". Notable modifications to the original implementation are: usage of "same" padding rather than no padding, usage of batch normalization, a different input image size. The training data consists of brain MRI images and masks from a Kaggle MRI segmentation dataset (see Credits). Early stopping is used in this project with a patience of 1 for demonstration purposes, but can be changed to a more optimal value.

To train neural network run this command in the terminal:

```terminal
python train.py
```

You can download dataset [here](https://www.kaggle.com/datasets/mateuszbuda/lgg-mri-segmentation/data)