# Virtual piano for Valga Muusikakool
## SQL
Inside the SQL folder there are isntall SQL scriptes for the database.

CreateTables.sql is you generic, create table there will be 2 tables created, 1 for notes 2nd for donators (buyers).

PopulateNotes.sql contains the populate data for Notes table. This is where the note prices will be stored and if it's possible to buy a note. There exists an automatic trigger on this table to calculate currentPrice.

AlreadyBoughtNoteOwners.sql populates Donators who have already bought notes.

## V3.0
The final interation of the virtual Piano
### usedContent
Stores the soundfont-player.js used for the piano sounds itself. This is a 3rd party library found : https://github.com/danigb/soundfont-player

### Styles
Contains some both custom & copied styles for all of the visual stuff that is custom created.

For the modal text above the input fields, it was HEAVILY influenced from : http://www.ornlabs.ee/checkout/63d363a9-847f-4304-8731-2c1da769fbad?language_code=et

### Api
Used for Database Connection to & from the database Tables. Currently user input is **NOT** being sanitized to my knowledge.

Total of 5 different endpoints
 * buyNote
 * donateToPiano
 * getAllDonators
 * getAllNotes
 * getNoteOwners
 
#### BuyNote
Key thing to keep in mind with this query is that each note has max price of 200€. This is the reason why there is an automated trigger for updating value for Notes table. This is also the reason why there is explicit check before even trying to insert into the Database to make sure the price does not go over 200€.

However when the system will be made to use direct bank links, this logic may need to be reworked as otherwise it can cause some **unwanted** cases

#### DonateToPiano
Since this is a regular donate, there is no note purchesing done, there is no need to validate.

#### Getters
Just queries some information from the database.

### Scripts
This here is the main logic of the whole Piano itself. It is spread over couple of script files, so it is more easily distinguished where what part of the logic is made.

#### Sound
This script file uses SoundFont-player to play the piano sounds.

#### Notes
This script file makes Database queries using AJAX

**TODO CHANGE STATIC LINKS TO NEW WEBSITE URLS**

#### Constants
This script file contains some event types that are used in other script files. (Technically can be refactored into other files)

#### CanvasObject
This script file is responsible for Drawing the virtual Piano onto the website. Key thing to take from this file. It uses "contentBoldElementId" to get the width of the piano. This should be the "main" div it will be inside of.

#### InputLogic
This script file is responsible for handeling the input logic for the piano. It handles Keyboard / Mouse / Touch (mobile phone) input logic. 

Key thing to take from this file, on "KeyDownLogic" it needs to return on INPUT & TEXTAREA tagName, because otherwise it will play the piano when user is trying to type into the form for the donation part.

#### DonatorCards
This script file is responsible for displaying the people who have purchesed a note.
#### ModalLogic
This script file is responsible for handeling the modal (popup window) logic for both Donating & Purchesing. 

Key thing to take from this file, is that this file is also responsible for submitting the form to insert the user into the database. There are some client side input checks made for this, however there also needs to be server side input validation.

**TODO CHANGE STATIC LINKS TO NEW WEBSITE URLS**
