import PIL
from PIL import Image
import numpy as np
import matplotlib.pyplot as plt

def get_prediction(model, img):
    pred = model(img)
    fig, ax = plt.subplots()
    ax.imshow(np.squeeze(img.cpu().numpy()).transpose(1, 2, 0), cmap='jet', alpha=1)
    ax.imshow(np.squeeze(pred.cpu().detach().numpy()), cmap='gray', alpha=0.5)
    ax.set_axis_off()
    fig.canvas.draw()
    img_np = np.array(fig.canvas.renderer.buffer_rgba())
    # Конвертация массива NumPy в объект Image

    image_pil = Image.fromarray(img_np.astype('uint8'))

    return image_pil