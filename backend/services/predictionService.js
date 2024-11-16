// backend/services/predictionService.js
const tf = require('@tensorflow/tfjs-node');

const createModel = () => {
  const model = tf.sequential();
  model.add(tf.layers.dense({ units: 50, activation: 'relu', inputShape: [10] }));
  model.add(tf.layers.dense({ units: 25, activation: 'relu' }));
  model.add(tf.layers.dense({ units: 1, activation: 'sigmoid' }));
  model.compile({ optimizer: 'adam', loss: 'binaryCrossentropy', metrics: ['accuracy'] });
  return model;
};

const trainModel = async (model, features, labels) => {
  const xs = tf.tensor2d(features);
  const ys = tf.tensor2d(labels, [labels.length, 1]);
  await model.fit(xs, ys, {
    epochs: 50,
    batchSize: 32,
    shuffle: true,
    validationSplit: 0.2,
    callbacks: tf.callbacks.earlyStopping({ monitor: 'val_loss', patience: 5 }),
  });
};

const predict = (model, input) => {
  const inputTensor = tf.tensor2d([input]);
  const prediction = model.predict(inputTensor);
  return prediction.dataSync()[0] > 0.5 ? 'Up' : 'Down';
};

module.exports = { createModel, trainModel, predict };
