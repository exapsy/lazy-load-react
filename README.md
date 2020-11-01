# Lazy Load

## Functionality

If the image is **not on the screen**, it loads the **placeholder** image, which is supposed to be only 1, so you dont load 100 different placeholder images. As the whole purpose of lazy loading is to make experience smoother.

When the image **is on screen**, it loads the low resolution image and the high resolution image. Whichever is loaded first, will show up on screen.

If you mess up the links between low res and high res, the low resolution image will show up on top of the high res, so make sure you dont do that.
