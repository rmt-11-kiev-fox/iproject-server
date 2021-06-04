const { Patient, Symptom } = require('../models')
const axios = require('axios')
var CryptoJS = require("crypto-js");

class PatientController {
    static async allPatients (request, response, next) {
        try {
            console.log('all patients hitted');
            let patients = await Patient.findAll({where: { user_id: request.user.id }})
            if (patients) {
                response.status(200).json({data: patients})
            } else {
                next({code:404, message: 'Data not found!'})
            }
        } catch (error) {
            next({code:400, message: error.message})
        }
    }

    static async patientDetails (request, response, next) {
        try {
            console.log('patient detail hitted');
            let patient = await Patient.findByPk(request.params.id)
            if (patient) {
                // GENERATING API_TOKEN
                // api_key is the username to access the API, a type of string and represent unique client id
                // secret_key is the corresponding password to access the API, type of string and represents a unique client password
                // hashed_credentials is a type of string and represents the calculated hash value HMACMD5(client_secret, requested_uri)

                let API_TOKEN = null;
                const uri = "https://sandbox-authservice.priaid.ch/login";
                const secret_key = process.env.API_MEDIC_PASSWORD;
                const computedHash = CryptoJS.HmacMD5(uri, secret_key);
                const computedHashString = computedHash.toString(CryptoJS.enc.Base64);
                let authService = await axios({
                    url: `https://sandbox-authservice.priaid.ch/login`,
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${process.env.API_MEDIC_USERNAME}:${computedHashString}`
                    }
                })
                if (authService) {
                    API_TOKEN = authService.data.Token
                } 
                let diagnosis = await axios({
                    url: `https://sandbox-healthservice.priaid.ch/diagnosis?symptoms=[${patient.symptoms}]&gender=${patient.gender}&year_of_birth=${patient.birth_year}&token=${API_TOKEN}&format=json&language=en-gb`,
                    method: 'GET'
                })
                if (diagnosis) {
                    response.status(200).json({data: patient, diagnosis: diagnosis.data})
                }
            }
        } catch (error) {
            next({code:400, message: error.message})
        }
    }

    static async newPatient (request, response, next) {
        try {
            console.log('new patient hitted');
            // CLIENT NEEDS TO HANDLE BIRTH YEAR TO AGE
            let patientSymptoms = []
            if (request.body.symptom1 !== '') {
                patientSymptoms.push(request.body.symptom1)
            }
            if (request.body.symptom2 !== '') {
                patientSymptoms.push(request.body.symptom2)
            }
            if (request.body.symptom3 !== '') {
                patientSymptoms.push(request.body.symptom3)
            }
            if (request.body.symptom4 !== '') {
                patientSymptoms.push(request.body.symptom4)
            }
            if (request.body.symptom5 !== '') {
                patientSymptoms.push(request.body.symptom5)
            }
            // console.log(patientSymptoms);
            let newPatient = {
                first_name: request.body.first_name,
                last_name: request.body.last_name,
                gender: request.body.gender,
                birth_year: request.body.birth_year,
                symptoms: patientSymptoms,
                user_id: request.user.id
            }
            let createPatient = await Patient.create(newPatient)
            if (createPatient) {
                response.status(201).json({data: createPatient})
            }
        } catch (error) {
            next({code:400, message: error.message})
        }
    }

    static async updatePatient (request, response, next) {
        try {
            console.log('update patient hitted');
            let patientSymptoms = []
            if (request.body.symptom1 !== '') {
                patientSymptoms.push(request.body.symptom1)
            }
            if (request.body.symptom2 !== '') {
                patientSymptoms.push(request.body.symptom2)
            }
            if (request.body.symptom3 !== '') {
                patientSymptoms.push(request.body.symptom3)
            }
            if (request.body.symptom4 !== '') {
                patientSymptoms.push(request.body.symptom4)
            }
            if (request.body.symptom5 !== '') {
                patientSymptoms.push(request.body.symptom5)
            }
            // console.log(patientSymptoms);
            let updatedPatient = {
                first_name: request.body.first_name,
                last_name: request.body.last_name,
                gender: request.body.gender,
                birth_year: request.body.birth_year,
                symptoms: patientSymptoms,
                user_id: request.user.id
            }
            let update = await Patient.update(updatedPatient, { where: { id: request.params.id }})
            if (update) {
                response.status(200).json({data: update})
            }
        } catch (error) {
            next({code:400, message: error.message})
        }
    }

    static async deletePatient (request, response, next) {
        try {
            console.log('delete patient hitted');
            let deletePatient = await Patient.destroy({where: { id: request.params.id}})
            if (deletePatient) {
                response.status(200).json({message: 'Patient deleted successfully!'})
            }
        } catch (error) {
            next({code:400, message: error.message})
        }
    }

    static async getSymptoms (request, response, next) {
        try {
            console.log('get symptoms hitted');
            // SYMPTOMS FOR SANDBOX ACCOUNT ARE ALREADY SEEDED IN DATABASE
            let symptoms = await Symptom.findAll({attributes: {exclude: ['createdAt', 'updatedAt']}})
            if (symptoms) {
                response.status(200).json({data: symptoms})
            }
        } catch (error) {
            next({code:400, message: error.message})
        }
    }
}

module.exports = PatientController