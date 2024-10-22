FROM python:3

RUN apt-get update && apt-get install -y \
    apache2 \
    libapache2-mod-wsgi-py3 \
    netcat-openbsd \
    && apt-get clean

WORKDIR /app

COPY . /app/

COPY requirements.txt /app/

RUN pip install --no-cache-dir -r requirements.txt

COPY ./apache-config.conf /etc/apache2/sites-available/000-default.conf

EXPOSE 8081

EXPOSE 5434

CMD sh -c "python3 manage.py migrate --noinput && python3 manage.py collectstatic --noinput && python manage.py runserver 0.0.0.0:8081"
