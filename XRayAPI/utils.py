import PIL
from PIL import Image
import numpy as np
import torch
from torchvision import transforms
import matplotlib.pyplot as plt
import scipy
import io

loader = transforms.Compose([transforms.Resize(255),
                                     transforms.CenterCrop(224),
                                     transforms.ToTensor(),
                                     transforms.Normalize(mean=[0.485, 0.456, 0.406],
                                            std=[0.229, 0.224, 0.225] ,inplace=True)
                                     ])

def imageLoader(image):
    img = Image.open(io.BytesIO(image)).convert("RGB")
    np_image = np.array(img)
    bgr_image = cv2.cvtColor(np_image, cv2.COLOR_RGB2BGR)
    pil_image = Image.fromarray(bgr_image)
    img = loader(pil_image).float()
    img = img.unsqueeze(0)
    return img

def write_activations(img, model, acts):
  logps = model.forward(img)
  # since we performed a forward pass through our model, we can obtain activations from layer
  out_features = acts.features[0].squeeze(0)
  out_features = out_features.detach().numpy()

  # changes shape from 2048*7*7 to 7*7*2048, just performe a matrix transpose
  out_features = np.transpose(out_features, (1, 2, 0))

  # final model layer is softmax activation, perform torch.exp to take out the log and obtain the softmax v
  ps = torch.exp(logps)

  # obtain the axis of the predicted class
  pred = np.argmax(ps.cpu().detach())

  # obtain all the weights connecting the global Average Pooling Layer to the final fully connected layer
  W = model.network.fc.weight

  # obtain the weights associated with the predicted class which is a 2048 dimensional vector
  w = W[pred,:]

  #dot product between a 7*7*2048 tensor and a 2048 tensor yields a 7*7 tensor
  # cam will therefore have a shape of 7*7
  cam = np.dot(out_features, w.detach().cpu())

  # zoom is the number of times we scale up our cam tensor (7*32, 7*32) = (224, 224)
  class_activation = scipy.ndimage.zoom(cam, zoom=(32, 32), order=1)

  # removes the batch dimension from the input image (1*3*224*224) to (3*224*224)
  img = np.squeeze(img, axis=0)

  # matplotlib supports channel-list dimensions so we perform a transpose operation on our image which changes
  img = np.transpose(img, (1, 2, 0))

  fig, ax = plt.subplots()
  ax.imshow(img, cmap='jet', alpha=1)
  ax.imshow(class_activation, cmap='jet', alpha=0.5)
  ax.set_axis_off()

  # Преобразование объекта figure в массив NumPy
  fig.canvas.draw()
  img_np = np.array(fig.canvas.renderer.buffer_rgba())
  # Конвертация массива NumPy в объект Image

  image_pil = Image.fromarray(img_np.astype('uint8'))

  return image_pil, pred