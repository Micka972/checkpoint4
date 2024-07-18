CREATE TABLE TaskList (
    id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    title VARCHAR(100) NOT NULL,
    description VARCHAR(300) NULL
);

CREATE TABLE Task (
    id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    name VARCHAR(100) NOT NULL,
    description VARCHAR(300) NULL,
    listID INT,
    FOREIGN KEY (listID) REFERENCES TaskList (id)
);

-- insertion table TaskList
INSERT INTO
    TaskList (title, description)
VALUES (
        'Tâches Quotidiennes',
        'Tâches à accomplir quotidiennement'
    );

INSERT INTO
    TaskList (title, description)
VALUES (
        'Projets Professionnels',
        'Tâches liées aux projets professionnels'
    );

INSERT INTO
    TaskList (title, description)
VALUES (
        'Objectifs Personnels',
        'Tâches liées au développement personnel et aux objectifs'
    );

-- insertion table Task
INSERT INTO
    Task (name, description, listID)
VALUES (
        'Exercice du Matin',
        '30 minutes de jogging',
        1
    );

INSERT INTO
    Task (name, description, listID)
VALUES (
        'Réunion d\'Équipe',
        'Discuter de l\'avancement du projet',
        2
    );

INSERT INTO
    Task (name, description, listID)
VALUES (
        'Lire un Livre',
        'Lire 20 pages d\'un livre',
        3
    );

INSERT INTO
    Task (name, description, listID)
VALUES (
        'Email aux Clients',
        'Envoyer les mises à jour hebdomadaires aux clients',
        2
    );

INSERT INTO
    Task (name, description, listID)
VALUES (
        'Acheter des Courses',
        'Acheter du lait, des œufs et du pain',
        1
    );

INSERT INTO
    Task (name, description, listID)
VALUES (
        'Apprendre l\'Espagnol',
        'Compléter une leçon sur Duolingo',
        3
    );