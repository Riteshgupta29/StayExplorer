const Listing = require("../models/listing.js");

module.exports.index = async (req, res , next) => {
    const AllListings=  await Listing.find({});
    res.render("listings/index.ejs", {AllListings});
};

module.exports.new = (req, res) =>{    
    res.render("listings/new.ejs");
    };

module.exports.show =async (req,res) =>{
    let {id}=req.params;
    const listing = await Listing.findById(id).populate({path:"reviews",populate:{ path: "author"}}).populate("owner");
    if (!listing) {
        req.flash("error"," Listing does not exist");
        res.redirect("/Listings") 
    };
    res.render("listings/show.ejs",{listing});
    };

module.exports.creat = async (req, res, next)=> {
    const newlisting = new Listing (req.body.vlisting);
    newlisting.owner = req.user._id;
    await newlisting.save();
    req.flash("success","New Listing added succesfully");
    res.redirect("/listings");
    };

    module.exports.edit =  async(req, res)=>{
        let {id}=req.params;
        const listing = await Listing.findById(id);
        if (!listing) {
            req.flash("error"," Listing does not exist");
            res.redirect("/Listings") 
        };
        res.render("listings/edit.ejs", {listing});
        };

 module.exports.update =async (req, res) =>{
    if (!req.body.vlisting){
        throw new ExpressError(400,"clint error");}
    let {id}=req.params; 
    await Listing.findByIdAndUpdate (id, {...req.body.vlisting});
    req.flash("success"," Listing updated succesfully");
    res.redirect ("/Listings");
    };      

    module.exports.delete =async (req, res) =>{
        let {id}=req.params;
        await Listing.findByIdAndDelete(id);
        req.flash("success"," Listing deleted succesfully");
        res.redirect("/Listings");
        };   