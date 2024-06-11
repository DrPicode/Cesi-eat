# Utilisez une image de base PostgreSQL
FROM postgres:latest

# Définissez les variables d'environnement pour la configuration de PostgreSQL
ENV POSTGRES_USER=user
ENV POSTGRES_PASSWORD=ccem
ENV POSTGRES_DB=CesiEats

# Copiez le script SQL pour créer la structure de la base de données
COPY create_database.sql /docker-entrypoint-initdb.d/