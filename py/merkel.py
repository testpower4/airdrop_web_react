import requests
from bs4 import BeautifulSoup

# Define the URL of the airdrop website
url = "https://dogera.io/"

# Send a GET request to the URL and get the response content
response = requests.get(url)
content = response.content

# Parse the HTML content using BeautifulSoup
soup = BeautifulSoup(content.decode('utf-8'), "html.parser")

# Find the Merkle tree data on the page
merkle_data = soup.find("div", {"class": "merkle"})
print(merkle_data, soup.find("div", {"class": "tree"}))

# Print the Merkle tree data
with open('merkle.txt','w', encoding='utf-8') as f:
    f.write(soup.text)