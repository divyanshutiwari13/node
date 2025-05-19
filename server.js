const express = require('express');
const mongoose = require('mongoose');
const app = express();
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/crud_demo', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const Item = mongoose.model('Item', new mongoose.Schema({
    name: String,
    value: Number
}));

app.get('/items', async (req, res) => {
    const items = await Item.find();
    res.json(items);
});

app.post('/items', async (req, res) => {
    const item = new Item(req.body);
    await item.save();
    res.status(201).json(item);
});

app.put('/items/:id', async (req, res) => {
    const item = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(item);
});

app.delete('/items/:id', async (req, res) => {
    await Item.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
});

app.listen(3000, () => console.log('Server running on port 3000'));
