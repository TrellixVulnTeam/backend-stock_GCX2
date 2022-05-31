// Controller responsável por tratar a solicitação recebida do 
// cliente e fornecer uma resposta

const { status } = require("express/lib/response");
const Produto = require("../model/produto");

// const getAllProducts = async (req, res) => {
//     const products = await Produto.findAll();
//     console.log(products);
// };

// const getOneProduct = async (req, res) => {
//     const id = req.params.id;
//     await Produto.findOne({ where: { id: id } }).then((item) => {
//         if (item != null) {
//             res.send(item);
//         } else {
//             res.sendStatus(404);
//         }
//     });
// };

// const createProducts = async (req, res) => {
//     try {
//         const newProduct = await Produto.create({
//             nome: req.body.nome,
//             descricao: req.body.descricao,
//             preco: req.body.preco,
//             quantidade: req.body.quantidade,
//         })
//         console.log("NEWPRODUCT", newProduct);
//         return res.json();
//         // return res.sendStatus(201);
//     }
//     catch (error) {
//         console.log(error);
//         return res.json();
//         // return res.sendStatus(500);
//     }
// }

// const updateProducts = async (req, res) => {
//     const id = req.params.id;
//     await Produto.findByPk(id).then((item) => {
//         if (item != null) {
//             item
//                 .update({
//                     nome: req.body.nome,
//                     descricao: req.body.descricao,
//                     preco: req.body.preco,
//                     quantidade: req.body.quantidade
//                 })
//                 .then(() => {
//                     res.sendStatus(204);
//                 });
//         } else {
//             res.sendStatus(404);
//         }
//     });
// };

// const deleteProducts = async (req, res) => {
//     const id = req.params.id;
//     await Produto.findByPk(id).then((item) => {
//         if (item != null) {
//             item.destroy();
//             res.sendStatus(200);
//         } else {
//             res.sendStatus(404);
//         }
//     });
// };



// metodo findAll() - é o SELECT * FROM ... do SQL.
// (a menos que tenha uma restrição por um where).
const getAllProducts = async (req, res) => {
    try {
        const products = await Produto.findAll();
        if (products === null) {
            return res.status(400).json("No products found");
        }
        return res.status(200).json(products);
    }
    catch (error) {
        console.log(error);
        // const res = { success: false, error: error }
        // return res.json({ message: error.message });
        return res.status(400).send(error);
    }
};

// o metodo findOne() - obtém a primeira entrada que encontra
const getOneProduct = async (req, res) => {
    try {
        const id = req.params.id;
        const product = await Produto.findOne({ where: { id } });
        if (product === null) {
            return res.status(400).json("Product not found");
        }
        //res.json(products);
        return res.status(200).json(product);
    }
    catch (error) {
        console.log(error);
        return res.status(400).send(error);
    }
}

const createProduct = async (req, res) => {
    const { nome, descricao, preco, quantidade } = req.body;
    try {
        let findName = await Produto.findOne({ where: { nome } })
        if (!findName) {
            const newProduto = await Produto.create({
                nome: nome,
                descricao: descricao,
                preco: preco,
                quantidade: quantidade,
            })
            const message = {
                message: "Created successful",
                data: newProduto
            }
            return res.status(200).json(message);
        }
        else {
            return res.status(400).json("Product name already exists");
        }
    } catch (error) {
        console.log(error);
        return res.status(400).send(error);
    }
}

const updateProduct = async (req, res) => {
    try {
        const { nome, descricao, preco, quantidade } = req.body
        const id = req.params.id;
        const product = await Produto.findOne({ where: { id } });
        if (!product) {
            return res.status(400).json("The product cannot be updated as it was not found");
        }
        product.nome = nome;
        product.descricao = descricao;
        product.preco = preco;
        product.quantidade = quantidade;
        await product.save();
        const message = {
            message: "Update successful",
            data: product
        }
        return res.status(200).json(message);
    }
    catch (error) {
        console.log(error);
        return res.status(400).send(error);
    }
}

const deleteProduct = async (req, res) => {
    try {
        const id = req.params.id;
        const product = await Produto.destroy({ where: { id } });
        if (!product) {
            return res.status(400).json("The product cannot be deleted as it was not found");
        }
        const message = {
            message: "Removed successful",
            data: product
        }
        return res.status(200).json(message);
    }
    catch (error) {
        console.log(error);
        return res.status(400).send(error);
    }
}

const deleteAllProducts = async (req, res) => {
    try {
        const products = await Produto.findAll();
        if (products === null) {
            return res.status(400).json("No products to delete");
        }
        const message = {
            message: "Products removed",
            data: products
        }
        products.destroy();
        return res.status(200).json(message);
    }
    catch (error) {
        console.log(error);
        // const res = { success: false, error: error }
        // return res.json({ message: error.message });
        return res.status(400).send(error);
    }
}


module.exports = {
    getAllProducts,
    getOneProduct,
    createProduct,
    updateProduct,
    deleteProduct,
    deleteAllProducts
};


