#Sensory Friendly 

##Data Model:
User:
- username: String,
- id: String,
- first_name: String,
- last_name: String,
- Email: String,

Business:
- Type: {}
- id
- phone_number: String,
- web_adress: String,

##Data JS Object:
var User: {
    username: String,
    id: String,
    first_name: String,
    last_name: String,
    email: String, 
}

var Business: {
    type:{
        Resturant: String,
        Theather: String,
        Park: String,
    }
    id: String,
    phone_number: String,
    web_address: String,
}

##Examples

var exampleUser {
    username: "raddad"
    id: ""
    first_name: "Benjamin"
    last_name: "Floyd"
    email: "benjaminfloyd@gmail.com"
    
}

var exampleBusiness: {
    type:[{ Theather: "Studio Movie Grill"}],
    id: "",
    phone_number: "770-992-8411",
    web_address: "studiomoviegrill.com"
}



<!--Reach/Icebox
- Rating
- Google maps directions
-Facebook login
- Location/Business:[]
- Age recommendation
Address: {
        street: String,
        City: String'
        State: GA
        Zipcode: Number 
            }
- Password
- Family Members
-->


