import fitz  # PyMuPDF
import io
from PIL import Image, UnidentifiedImageError
import imagehash
import os
import shutil
import json

# STEP 2
# file path you want to extract images from

pdfs = os.listdir("pdfs")

for pdf_name in pdfs:
    file = f"pdfs/{pdf_name}"

    dirname = f"imgs/{pdf_name}"
    if os.path.exists(dirname):
        shutil.rmtree(dirname)
    os.mkdir(dirname)

    pdf_file = fitz.open(file)

    black_image = Image.new("RGB", (100, 100), color="black")
    black_image_hash = imagehash.average_hash(black_image)

    # Dictionary to store the results for JSON
    images_info = {}

    for page_index in range(len(pdf_file)):
        page = pdf_file.load_page(page_index)  # load the page
        image_list = page.get_images(full=True)  # get images on the page

        # Store the images found on this page
        images_info[str(page_index + 1)] = []

        # printing number of images found in this page
        if image_list:
            print(f"[+] Found a total of {len(image_list)} images on page {page_index}")
        else:
            print("[!] No images found on page", page_index)
        
        for image_index, img in enumerate(image_list, start=1):
            xref = img[0]

            base_image = pdf_file.extract_image(xref)
            image_bytes = base_image["image"]

            # get the image extension
            image_ext = base_image["ext"]

            # save the image
            image_name = f"{dirname}/image{page_index+1}_{image_index}.{image_ext}"

            try:
                # Try to open the image using PIL
                image = Image.open(io.BytesIO(image_bytes))
                image.verify()  # Check if this is a valid image
                print(f"[+] {image_name} ...")

                # Checking the dimensions to see if it's too small or likely not an image
                width, height = image.size
                if width < 150 or height < 150:  # arbitrary minimum size
                    print("FAIL IMG SIZE", (width, height))
                    continue

                # Use image hashing to detect complexity (more complex = likely an image)
                hash_val = imagehash.average_hash(Image.open(io.BytesIO(image_bytes)))
                hash_difference = abs(hash_val - black_image_hash)  # Compare with all-black image hash
                if hash_difference < 5:  # arbitrary complexity threshold
                    print("FAIL HASH SCORE", hash_difference)
                    continue

                with open(image_name, "wb") as image_file:
                    image_file.write(image_bytes)
                    print(f"[+] Image saved as {image_name}")
                    
                    # Append the image info to the list for this page
                    images_info[str(page_index + 1)].append(image_name)

            except UnidentifiedImageError:
                print(f"[!] Failed to identify image {image_name}.")
            except Exception as e:
                print(f"[!] Error processing image {image_name}: {e}")

    # Write the images info to a JSON file
    with open(f"jsons/{pdf_name}.json", "w") as json_file:
        json.dump(images_info, json_file, indent=4)

    print("[+] JSON file with image info saved as " + f"jsons/{pdf_name}.json")