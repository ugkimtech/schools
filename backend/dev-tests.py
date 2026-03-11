import random
import string

def generate_password():
    characters = string.ascii_letters + string.digits
    return ''.join(random.choices(characters, k=5))