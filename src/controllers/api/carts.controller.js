import * as cartsService from '../../services/carts.service.js';
import { ResultNotFound } from '../../utils/customExceptions.js';

const saveCart = async (req, res) => {
    try{
        const result = await cartsService.saveCart();
        res.send({status: 'sucess', message:'Carrito creado', payload: result});
        req.logger.info(`Solicitud procesada: ${req.method} ${req.url}`);
    } catch(error){
        res.status(500).send({error});
        req.logger.error(`${req.method} en ${req.url} - ${new Date().toISOString()} - ${error}`);
    }
};

const getCart = async(req,res)=> {
    try{
        const cid = req.params.cid;

        const result = await cartsService.getCart(cid);
        res.sendSuccess(result)
        req.logger.info(`Solicitud procesada: ${req.method} ${req.url}`);
    } catch(error){
        req.logger.error(`${req.method} en ${req.url} - ${new Date().toISOString()} - ${error}`);
        if(error instanceof ResultNotFound){
            res.sendClientError('Carrito no encontrado')
        }
        res.status(500).send({error});
    }
};

const saveProductToCart = async (req, res) => {
    try{
        const cid = req.params.cid;
        const pid = req.params.pid;

        const result = await cartsService.saveProductToCart(cid, pid);

        result ?  res.sendSuccess({status: 'sucess', message:'Producto agregado al carrito'}) : res.sendClientError({status: 'error', message: 'Carrito no encontrado'})
        req.logger.info(`Solicitud procesada: ${req.method} ${req.url}`);
    } catch(error){
        res.status(500).send({error})
        req.logger.error(`${req.method} en ${req.url} - ${new Date().toISOString()} - ${error}`);
    }
};

const deleteProductToCart = async (req, res) => {
    try{
        const cid = req.params.cid;
        const pid = req.params.pid;

        const result = await cartsService.deleteProductToCart(cid, pid);
        
        result  
            ? result === "error" 
                ? res.sendClientError({status: 'error', message: 'Producto no encontrado dentro del carrito'})
                : res.sendSuccess({status: 'sucess', message:'Producto eliminado del carrito'})
            : res.sendClientError({status: 'error', message: 'Carrito no encontrado'});        
        req.logger.info(`Solicitud procesada: ${req.method} ${req.url}`);
    } catch(error){
        res.status(500).send({error});
        req.logger.error(`${req.method} en ${req.url} - ${new Date().toISOString()} - ${error}`);
    }
};

const updateCart = async(req,res)=> {
    try{
        const productsUpdate = req.body;
        const cid = req.params.cid;
        
        const result = await cartsService.updateCart(cid, productsUpdate);

        result ? res.sendSuccess({status: 'sucess', message:`Carrito modificado`}) : res.sendClientError({status: 'error', message:`Carrito no encontrado`})
        req.logger.info(`Solicitud procesada: ${req.method} ${req.url}`);
    } catch(error){
        res.status(500).send({error})
        req.logger.error(`${req.method} en ${req.url} - ${new Date().toISOString()} - ${error}`);
    }
};

const updateQuantityProductToCart = async (req, res) => {
    try{
        const cid = req.params.cid;
        const pid = req.params.pid;
        const quantityUpdate = req.body;

        const result = await cartsService.updateQuantityProductToCart(cid, pid, quantityUpdate);

        result  
            ? result === "error" 
                ? res.sendClientError({status: 'error', message: 'Producto no encontrado dentro del carrito'})
                : res.sendSuccess({status: 'sucess', message:'Cantidad del producto modificado'})
            : res.sendClientError({status: 'error', message: 'Carrito no encontrado'});     
        req.logger.info(`Solicitud procesada: ${req.method} ${req.url}`);
    } catch(error){
        res.status(500).send({error})
        req.logger.error(`${req.method} en ${req.url} - ${new Date().toISOString()} - ${error}`);
    }
};

const deleteAllProductsToCart = async (req, res) => {
    try{
        const cid = req.params.cid;

        const result = await cartsService.deleteAllProductsToCart(cid);

        result ? res.sendSuccess({status: 'sucess', message:`Productos eliminados del carrito`}) : res.sendClientError({status: 'error', message:`Carrito no encontrado`})
        req.logger.info(`Solicitud procesada: ${req.method} ${req.url}`);
    } catch(error){
        res.status(500).send({error})
        req.logger.error(`${req.method} en ${req.url} - ${new Date().toISOString()} - ${error}`);
    }
};

const saveProductToCartSession = async (req, res) => {
    try {
        const pid = req.params.id;

        const result = await cartsService.saveProductToCartSession(pid, req, res);
        res.send({status: 'sucess', result});
        req.logger.info(`Solicitud procesada: ${req.method} ${req.url}`);
    } catch (error) {
        res.status(500).send({error});
        req.logger.error(`${req.method} en ${req.url} - ${new Date().toISOString()} - ${error}`);
    }
};

const purchaseCart = async (req, res) => {
    try {
        const cid = req.params.cid;

        const result = await cartsService.purchaseCart(cid, req);
        res.sendSuccess({status: 'sucess', result});
        req.logger.info(`Solicitud procesada: ${req.method} ${req.url}`);
    } catch (error) {
        console.log(error)
        res.status(500).send({error})
        req.logger.error(`${req.method} en ${req.url} - ${new Date().toISOString()} - ${error}`);
    }
};


export {
    saveCart,
    getCart,
    saveProductToCart,
    deleteProductToCart,
    updateCart,
    updateQuantityProductToCart,
    deleteAllProductsToCart,
    saveProductToCartSession,
    purchaseCart
}