import {auth} from 'express-oauth2-jwt-bearer'

const jwtCheck = auth({
    audience: 'https://real-estate-backend-ut61.onrender.com',
    issuerBaseURL: "https://realestate-project.us.auth0.com",
    tokenSigningAlg:"RS256"
})

export default jwtCheck;