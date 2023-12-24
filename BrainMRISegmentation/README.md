### Pytorch-UNet Brain-MRI

This is a UNet implementation in PyTorch using a modified version of the original UNet from the paper "U-Net: Convolutional Networks for Biomedical Image Segmentation". Notable modifications to the original implementation are: usage of "same" padding rather than no padding, usage of batch normalization, a different input image size. The training data consists of brain MRI images and masks from a Kaggle MRI segmentation dataset (see Credits). Early stopping is used in this project with a patience of 1 for demonstration purposes, but can be changed to a more optimal value.

#### Dataset

You can download dataset [here](https://www.kaggle.com/datasets/mateuszbuda/lgg-mri-segmentation/data)
This dataset contains brain Magnetic Resonance Images (MRIs) together with manual FLAIR abnormality segmentation masks. The images were obtained from The Cancer Imaging Archive (TCIA).
You can see EDA of dataset in the EDA notebook in the notebooks directory.

### What is brain tumor?
A brain tumor is a growth of cells in the brain or near it. Brain tumors can happen in the brain tissue. Brain tumors also can happen near the brain tissue. Nearby locations include nerves, the pituitary gland, the pineal gland, and the membranes that cover the surface of the brain.


To train neural network run this command in the terminal:

```terminal
python train.py
```