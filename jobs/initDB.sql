-- Create users data
CREATE TABLE UserAccount (
    UserAccountID SERIAL PRIMARY KEY,
    Username VARCHAR(50) UNIQUE NOT NULL,
    Password TEXT NOT NULL
);

-- Create refresh key data
CREATE TABLE ClientAuthentication (
    ClientID SERIAL PRIMARY KEY,
    LastLogin TIMESTAMP NOT NULL,
    RefreshToken TEXT NOT NULL,
    RefreshTokenExpiry TIMESTAMP NOT NULL,
    UserAccountID INTEGER NOT NULL REFERENCES UserAccount(UserAccountID) ON DELETE CASCADE
);

-- Create preset data
CREATE TABLE Preset (
    PresetID SERIAL PRIMARY KEY,
    Name TEXT NOT NULL,
    Preamble TEXT NOT NULL,
    Sep TEXT NOT NULL,
    Postamble TEXT NOT NULL
);

-- Create collection data
CREATE TABLE Collection (
    CollectionID SERIAL PRIMARY KEY,
    Name VARCHAR(50) NOT NULL
);

-- Create subcollection data
CREATE TABLE SubCollection (
    SubCollectionID SERIAL PRIMARY KEY,
    Name VARCHAR(50) NOT NULL
);

-- Create question data
CREATE TABLE Question (
    QuestionID SERIAL PRIMARY KEY,
    Name TEXT NOT NULL,
    Content TEXT NOT NULL,
    Source TEXT
);

-- Create user - preset junction data
CREATE TABLE JunctionUserAccountPreset (
    UserAccountID INTEGER NOT NULL REFERENCES UserAccount(UserAccountID) ON DELETE CASCADE,
    PresetID INTEGER NOT NULL REFERENCES Preset(PresetID) ON DELETE CASCADE
);

-- Create subcollection - question junction data
CREATE TABLE JunctionSubCollectionQuestion (
    SubCollectionID INTEGER NOT NULL REFERENCES SubCollection(SubCollectionID) ON DELETE CASCADE,
    QuestionID INTEGER NOT NULL REFERENCES Question(QuestionID) ON DELETE CASCADE
);

-- Create user - question junction data
CREATE TABLE JunctionUserAccountQuestion (
    UserAccountID INTEGER NOT NULL REFERENCES UserAccount(UserAccountID) ON DELETE CASCADE,
    QuestionID INTEGER NOT NULL REFERENCES Question(QuestionID) ON DELETE CASCADE,
    LastReviewed DATE
);

-- Create user - collection junction data
CREATE TABLE JunctionUserAccountCollection (
    UserAccountID INTEGER NOT NULL REFERENCES UserAccount(UserAccountID) ON DELETE CASCADE,
    CollectionID INTEGER NOT NULL REFERENCES Collection(CollectionID) ON DELETE CASCADE
);

-- Create collection - subcollection junction data
CREATE TABLE JunctionCollectionSubCollection (
    CollectionID INTEGER NOT NULL REFERENCES Collection(CollectionID) ON DELETE CASCADE,
    SubCollectionID INTEGER NOT NULL REFERENCES SubCollection(SubCollectionID) ON DELETE CASCADE
);
