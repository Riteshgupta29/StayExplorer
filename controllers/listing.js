const Listing = require("../models/listing.js");
const mbxGeoCoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken = process.env.MAP_TOKEN
const geoCodingClient = mbxGeoCoding({ accessToken: mapToken });


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
     let response = await geoCodingClient.forwardGeocode({
            query: req.body.vlisting.location,
            limit:1
            }).
            send()
        const url = req.file.path;
        const filename = req.file.filename;
        const newlisting = new Listing (req.body.vlisting);
        newlisting.image={url,filename}
        newlisting.owner = req.user._id;
        newlisting.geometry = response.body.features[0].geometry;
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
        // let originalUrl = listing.image.url;
        // originalUrl.replace("/upload", "/upload/h_300,w_250");
        res.render("listings/edit.ejs", {listing});
        };

 module.exports.update =async (req, res) =>{
    // if (!req.body.vlisting){
    //     throw new ExpressError(400,"clint error");}
    let {id}=req.params;
    let listing = await Listing.findByIdAndUpdate (id, {...req.body.vlisting});
    if(typeof req.file !=="undefined"){
    const url = req.file.path;
    const filename = req.file.filename;
    listing.image = {url, filename};
    await listing.save();
 }  
    req.flash("success"," Listing updated succesfully");
    res.redirect ("/Listings")
    };      

    module.exports.delete =async (req, res) =>{
        let {id}=req.params;
        await Listing.findByIdAndDelete(id);
        req.flash("success"," Listing deleted succesfully");
        res.redirect("/Listings");
        }
