const mongoose=require('mongoose');
// const BookingSchema=new mongoose.Schema({
//     id:{type:mongoose.Schema.Types.ObjectId, require:true}, 
//     place:{type:mongoose.Schema.Types.ObjectId, require:true,ref:'Place'},
//     title:{type:String,require:true},
//     checkInInfo:{type:Date,require:true},
//     checkOutInfo:{type:Date,require:true},
//     name:{type:String,require:true},
//     phone:{type:String,require:true},
//     price:{type:Number,require:true},
//     maxGuests:Number,
    
//     paid:Boolean,
// })
        const BookingSchema = new mongoose.Schema({
            user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
            place: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Place' },
            checkInInfo: { type: Date, required: true },
            checkOutInfo: { type: Date, required: true },
            name: { type: String, required: true },
            phone: { type: String, required: true },
            price: { type: Number, required: true },
            maxGuests: Number,
            paid: Boolean,
        });

const BookingModel=mongoose.model('Booking',BookingSchema);
module.exports=BookingModel;