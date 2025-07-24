const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  nombre: { type: String, required: true, trim: true },
  descripcion: { type: String, required: true, trim: true },
  precio: { type: Number, required: true, min: 0 },
  descuento: { type: Number, default: 0, min: 0, max: 100 },
  categoria: { type: String, required: true, trim: true },
  fecha_creacion: { type: Date, default: Date.now },
  stock: { type: Number, required: true, min: 0 }
});

productSchema.methods.toJSON = function () {
  const obj = this.toObject();
  obj.id = obj._id; 
  delete obj._id;
  delete obj.__v;
  obj.currentCost = obj.precio * (1 - obj.descuento / 100);
  return obj;
};

module.exports = mongoose.model('Product', productSchema);
