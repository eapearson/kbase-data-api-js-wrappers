# Installing Data API Service for Dev Usage

- set up a vm
     ensure memory 1G or higher

- install python dev tools:
     
    sudo apt-get install python-dev
    sudo apt-get install python-setuptools
    sudo apt-get install python-pip
    sudo pip install --upgrade pip
        this solves a problem with pandas install

- install dependencies

    python setup.py install

    sudo pip install -r requirements.txt


- if not using branch with http service, install 

    lib/doekbase/data_api/tests/taxon_service_http_driver.py

from the same named sample file found here.


- start service

python lib/doekbase/data_api/tests/taxon_service_http_driver.py