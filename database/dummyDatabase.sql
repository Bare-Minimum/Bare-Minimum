INSERT INTO Users (name, email, password, salt, createdAt, updatedAt) VALUES ('Death', 'deadnotsleeping@gmail.com', 'DeathP', '1234', CURDATE(), CURDATE());
INSERT INTO Users (name, email, password, salt, createdAt, updatedAt) VALUES ('Pestilence', 'admin@angularjs.com', 'PestilenceP', '5678', CURDATE(), CURDATE());
INSERT INTO Users (name, email, password, salt, createdAt, updatedAt) VALUES ('War', 'fitemeirl@hotmail.com', 'WarP', '91011', CURDATE(), CURDATE());
INSERT INTO Users (name, email, password, salt, createdAt, updatedAt) VALUES ('Famine', '2hungry4u@yahoo.com', 'FamineP', '121314', CURDATE(), CURDATE());

INSERT INTO Trips (name, location, startDate, endDate, lodging, accessCode, isopen, createdAt, updatedAt) VALUES ('Amsterdames', 'Amsterdam', '2017-11-15', '2017-11-21', 'The Lawdge', 'A5678', true, CURDATE(), CURDATE());
INSERT INTO Trips (name, location, startDate, endDate, lodging, accessCode, isopen, createdAt, updatedAt) VALUES ('Oktobeerfest', 'Munich', '2017-10-20', '2017-10-30', 'Mein Haus', 'A1234', true, CURDATE(), CURDATE());

INSERT INTO UserTrips (flightItinerary, phone, TripId, UserId, createdAt, updatedAt) VALUES ('AA567', '867-5309', 1, 1, CURDATE(), CURDATE());
INSERT INTO UserTrips (flightItinerary, phone, TripId, UserId, createdAt, updatedAt) VALUES ('AA395', '555-5566', 1, 2, CURDATE(), CURDATE());
INSERT INTO UserTrips (flightItinerary, phone, TripId, UserId, createdAt, updatedAt) VALUES ('WOW1755', '867-1234', 2, 3, CURDATE(), CURDATE());
INSERT INTO UserTrips (flightItinerary, phone, TripId, UserId, createdAt, updatedAt) VALUES ('WOW5766', '444-5566', 2, 4, CURDATE(), CURDATE());