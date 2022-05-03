import mongoose from 'mongoose';
import cuid from 'cuid';

/*const addGcalEvent = require('./../googleCalendar')*/
import validator from 'validator'; //todo can we inmport only a subset

import { setHours } from 'date-fns'
import { nextDay } from 'date-fns';

const customerObj = {
  name: {
    type: String,
    required: true,
    validate: [
      {
        validator: (v) => {
          return v.length > 4;
        },
        message: `name must have more than 4 characters`,
      },
    ],
  },
  mobile: {
    type: String,
    validate: {
      validator: (v) => {
        return validator.isMobilePhone(v, ["en-GB"]);
      }, //TODO restrict this to uk and have anohter field for other phone numbers.
      message: `must be a valid mobile number`,
    },
  },
  email: {
    type: String,
    validate: {
      validator: validator.isEmail,
      message: "must be a valid email",
    },
  },
};

const customerSchema = mongoose.Schema(customerObj);

const chargesObj = {
  hourlyRate: { type: Number },
  fuelCharge: { type: Number },
  travelTime: { type: Number },
};

const chargesSchema = mongoose.Schema(chargesObj);

const addressObj = {
  _id: {
    type: String,
    default: cuid,
  },
  value: {
    validate: {
      validator: (v) => {
        return v.length > 4;
      },
      message: `address must have more than 4 characters`,
    },
    type: String,
  },
};

const addressSchema = mongoose.Schema(addressObj);

const operativeObj = {
  _id: {
    type: String,
    default: cuid,
  },
  value: {
    validate: {
      validator: (v) => {
        return v.length > 3;
      },
      message: `operative must have more than 3 characters`,
    },
    type: String,
  },
};

const operativeSchema = mongoose.Schema(operativeObj);

export const jobSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: cuid,
  },
  start: {
    type: Date,
    required: true,
  },
  end: {
    type: Date,
    required: true,
  },
  customer: customerSchema,
  charges: chargesSchema,
  items: String,
  addresses: [addressSchema],
  operatives: [operativeSchema],
  markCompleted: Boolean,
  sub: {
    type: String,//TODO add validation to this using hook as adding it to schema will cause to fail on client
  },
});

let Job = mongoose.model("Job", jobSchema, "jobs");

function getPagination(skip,limit,count){
  return{
    from: skip +1,
    to: Math.min(skip + limit,count),
    of: count
  }
}

async function list({ from, to, skip, limit, sub }) {
  const filter = {}
  if(from) filter.start = { $gte: from }
  if(to) filter.end = { $lte: to }
  filter.sub = sub
  const query  = Job
      .find(filter)

  const count = await Job.countDocuments(filter)
  console.log(count)
  if(skip && limit){
    query.limit(Number(limit))
        .skip(Number(skip))
  }
  let items = await query;
  return {items,
    pagination: getPagination(skip,limit,count),
    count: items.length
  };
}

async function create(data, sub) {
  let job = new Job({ ...data, sub });
  await job.save(); //TODO add some validation start must be before end
  return job;
}

async function get(id) {
  const job = await Job.findById(id);
  return job;
}

async function remove(id) {
  let data = await Job.deleteOne({ _id: id });
  return data;
}

async function edit(_id, change) {
  // let job = await Job.findByIdAndUpdate(_id, change, {
  //   new: true,
  //   runValidators: true,
  // });
  // return job;
  const job = await get(_id);
  Object.keys(change).forEach(function (key) {
    job[key] = change[key];
  });
  await job.save();
  return job;
}

async function resetData(data) {
  await Job.deleteMany();
  console.log(data);
  await Job.insertMany(data);
}

export default {
  list,
  create,
  get,
  remove,
  resetData,
  edit,
  jobSchema,
};

