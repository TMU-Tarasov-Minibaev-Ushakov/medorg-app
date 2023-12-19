This kernel was created to classify images with lung pathologies, and localize regions with infection.


Here, Residual Network (ResNet) via transfer learning, a popular deep learning neural network model, is used to classify chest X-ray images of pneumonia. This dataset consists of approximately 5,000 and 600 images in the training and test set, respectively. It is quite small by today's big epoch standards, and this poses some problems such as data imbalance, which I will try to address. Using transfer learning capabilities, we can "transfer" the weights of low-level features (e.g., lines, shapes, etc.) that were detected in the pre-trained model. 


To train neural network run this command in the terminal:

```terminal
python train.py
```
