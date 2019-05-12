CREATE DATABASE rate_me;

USE rate_me;

CREATE TABLE shows(
    id int auto_increment,
    title varchar(255),
    filename varchar(255),
    descrip text,
    showtype text,
    one int,
    two int,
    three int,
    four int,
    five int,
    primary key(id));

INSERT INTO shows SET
title='Your Name',
filename='your_name.jpg',
descrip='A teenage boy and girl embark on a quest to meet each other for the first time after they magically swap bodies.',
showtype='movie',
one = 0, two = 0, three = 0, four = 3, five = 4;

insert into shows set title='Anohana',
filename='anohana.jpg',
descrip='Menma\'s friends reunite after her death to help her resolve a wish in order to pass into the afterlife.',
showtype='movie',
one = 0, two = 0, three = 0, four = 5, five = 3;

INSERT INTO shows SET
title='One Punch Man',
filename='one_punch_man.jpeg',
descrip='Monsters from the Monster Association launch simultaneous attacks on all the human cities, attempting to overwhelm the forces of the Hero Association. Meanwhile, the “Super Fight” martial arts tournament kicks off.',
showtype='series',
one = 1, two = 2, three = 4, four = 3, five = 10;

INSERT INTO shows SET
title='My Neighbor Totoro',
filename='my_neighbor_totoro.jpeg',
descrip='This acclaimed animated tale by director Hayao Miyazaki follows schoolgirl Satsuke and her younger sister, Mei, as they settle into an old country house with their father and wait for their mother to recover from an illness in an area hospital. As the sisters explore their new home, they encounter and befriend playful spirits in their house and the nearby forest, most notably the massive cuddly creature known as Totoro.',
showtype='movie',
one = 0, two = 0, three = 1, four = 3, five = 6;

INSERT INTO shows SET
title='Attack On Titan',
filename='attack_on_titan.jpg',
descrip='After 100 years of peace, humanity is suddenly reminded of the terror of being at the Titans\'s mercy.',
showtype='series',
one = 1, two = 2, three = 1, four = 5, five = 8;