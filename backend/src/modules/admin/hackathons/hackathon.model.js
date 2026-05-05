import mongoose from 'mongoose'
import { hackathonCurrencyType, hackathonModeEnums } from './hackathon.constant'


const hackathonSchema = new mongoose.Schema({
  title:{
    type:String,
    required:true
  },
  slug:{
    type:String,
    required:true
  },
  description:{
    type:String,
    required:true
  },
  mode:{
    type:[String],
    enum:hackathonModeEnums
  },
  allowedModes:{
    type:[String],
    
  },
  startDate:{
    type:Date,
    required:true
  },
  endDate:{
    type:Date,
    required:true
  },
  registrationDeadline:{
    type:Date,
    required:true
  },
  submissionDeadline:{
    type:Date,
    required:true
  },
  prizePool:{
    type:Number,
    required:true
  },
  registrationFee:{
    type:Number,
    required:true
  },
  currency:{
    type:String,
    enum:hackathonCurrencyType,
    required:ture,
    default:"INR"
  },
  minTeamSize:{
    type:Number,
    required:true,
    default:2
  },
  maxTeamSize:{
    type:Number,
    default:4
  },
  technologyDomains:{
    type:[String],
    required:true
  },
  rules:{
    type:[String],
    required:true
  },
  judgingCriteria:{
    type:[
      {
        name:{
          type:String,
          required:true
        },
        weight:{
          type:Number,
          required:true
        }
      }
    ]
  },
  eligibility:{
    type:[String],
    required:true,
    default:"Student"
  }
  // sponsors:{
  //   type:[
  //     {
        
  //     }
  //   ]
  // }

},{
  timestamps:true
})