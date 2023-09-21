const mongoose = require('mongoose')

mongoose.connect("mongodb+srv://khnl18893:025377326@cluster0.ezin7pn.mongodb.net/")
    .then(() => {
        console.log("mongo concted"); })
    .catch(() => {
        console.log("fild  to concted");  })
const loginScema = mongoose.Schema({
    name: {
        type: String,
        // required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
}, { Timestamp: true })
module.exports =  mongoose.model('users', loginScema)




















































// const User = new mongoose.model('Cluster0', loginScema)
// module.exports = User



// const imagePath = 'path/to/image.jpg'; // נתיב התמונה במערכת הקבצים
// const imageContent = fs.readFileSync(imagePath); // קריאת התמונה
// const imageBase64 = imageContent.toString('base64'); // המרת התמונה למחרוזת בפורמט Base64
// const imageMetadata = {
//   filename: 'image.jpg',
//   // כאן תוכל להוסיף מידע נוסף על התמונה, כגון מידע תיאורי או תגים
// };

// const collectionName = 'images'; // שם האוסף במסד הנתונים

// const collectison = db.collection(collectionName);
// collection.insertOne({ metadata: imageMetadata, image: imageBase64 }, function(err, result) {
//   client.close(); // סגירת החיבור למסד הנתונים
// });











