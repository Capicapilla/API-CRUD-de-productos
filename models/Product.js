const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  nombre: { type: String, required: true, trim: true },
  descripcion: { type: String, required: true, trim: true },
  precio: { type: Number, required: true, min: 0 },
  descuento: { type: Number, default: 0, min: 0, max: 100 },
  categorias: { 
    type: [String],
    default: ["Tienda"] 
  },
  fecha_creacion: { type: Date, default: Date.now },
  stock: { type: Number, required: true, min: 0 },

  // Julio pide: comentarios

  reviews: [
    {
    usuario: { type: String, required: true, trim: true },
    comentario: { type: String, required: true },
    rating: { type: Number, min: 1, max: 5, default: 5 },
    fecha: {type: Date, default: Date.now }

  }
  ]
});

productSchema.methods.toJSON = function () {
  const obj = this.toObject();
  obj.id = obj._id; 
  delete obj._id;
  delete obj.__v;

  //precios hablados en clase cambiar cnts a €

  obj.precio = obj.precio.toFixed(2);
  obj.currentCost = (obj.precio * (1 - obj.descuento / 100)).toFixed(2);

  return obj;
};

module.exports = mongoose.model('Product', productSchema);
