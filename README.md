
## Installation with Docker

Build and start:

There is no need to clone the code , you can just get the docker-compose.yml into your machine and run the :

```bash
 docker-compose up
```

Check :

  http://localhost:8000/ #backend
  
  http://localhost:3000/ #frontend

And to build the docker images run

```bash
 docker-compose build
```

To create superuser run in another wsl

```bash
docker exec -it Inventory-Management /bin/bash

python manage.py createsuperuser

```

## Frontend Installation

```bash
  cd Inventory-Management/front
```

Install the required Node.js packages:

```bash
  npm install
```

Start the frontend app:

```bash
  npm run dev
```

## Backend Installation

Open a new terminal and go to the backend directory:

```bash
  cd Inventory-Management/reviews
```

```bash
python -m venv env

.\env\Scripts\activate
```

Install Django Packages

```bash
  pip install djangorestframework django-cors-headers
```

```bash
  python manage.py migrate
```

Create a superuser for the Django project:

```bash
  python manage.py createsuperuser
```

```bash
  python manage.py runserver
```
