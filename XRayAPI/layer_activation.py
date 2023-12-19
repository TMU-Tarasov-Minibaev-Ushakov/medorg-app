"""
Conatain LayerActivations class to visuzlize last layer's 
feature map
"""
class LayerActivations():
   features=[]
   def __init__(self,model):
       self.hooks = []
       #model.layer4 is the last layer of our network before the Global Average Pooling layer(last convolutional layer).
       self.hooks.append(model.network.layer4.register_forward_hook(self.hook_fn))

   def hook_fn(self,module,input,output):
       self.features.append(output)

   def remove(self):
       for hook in self.hooks:
           hook.remove()