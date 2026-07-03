import PIL.Image
import PIL.ImageDraw
import random

def create_paper_texture(path):
    img = PIL.Image.new('RGB', (200, 200), color=(245, 245, 240))
    pixels = img.load()
    for x in range(img.size[0]):
        for y in range(img.size[1]):
            noise = random.randint(-5, 5)
            r, g, b = pixels[x, y]
            pixels[x, y] = (r + noise, g + noise, b + noise)
    img.save(path)

def create_surface_texture(path):
    img = PIL.Image.new('RGB', (200, 200), color=(240, 235, 230))
    pixels = img.load()
    for x in range(img.size[0]):
        for y in range(img.size[1]):
            noise = random.randint(-2, 2)
            r, g, b = pixels[x, y]
            pixels[x, y] = (r + noise, g + noise, b + noise)
    img.save(path)

create_paper_texture('src/assets/textures/paper.png')
create_surface_texture('src/assets/textures/surface.png')
