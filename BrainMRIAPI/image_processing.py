from torchvision import transforms
import torchvision.transforms.functional as TF

import PIL
from PIL import Image
import io

def transform(image):
  # Resize
  resize = transforms.Resize(size=(256, 256))
  image = resize(image)

  # Transform to tensor
  image = TF.to_tensor(image)
  return image

def imageLoader(image):
    img = Image.open(io.BytesIO(image)).convert("RGB")
    img = transform(img).float()
    img = img.unsqueeze(0)
    return img