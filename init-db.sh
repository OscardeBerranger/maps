#!/bin/bash
set -e

psql -U root
<<EOF
CREATE USER oscaro WITH LOGIN PASSWORD 'oscaro' CREATEDB;
CREATE DATABASE mapsdatabase OWNER oscaro;
GRANT ALL PRIVILEGES ON DATABASE mapsdatabase TO oscaro;
EOF

