from flask import Flask, request
import pickle
from sklearn.preprocessing import MultiLabelBinarizer

app = Flask(__name__)


# Load the model from file
with open("./src/model/clf.pkl", "rb") as f:
    model = pickle.load(f)

# load the english tokenizer from file
with open('./src/model/tfidf.pkl', 'rb') as f:
    tfidf = pickle.load(f)

# load the fitted multilabelbinarizer
with open ('./src/model/multilabel.pkl','rb') as f:
    multilabel = pickle.load(f)

def predict_tags(topic):
    print("1",topic)
    transformed_input = tfidf.transform([topic])
    print("2",transformed_input)
    array_result = model.predict(transformed_input)
    print("3", array_result)
    return multilabel.inverse_transform(array_result)

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"


@app.post("/predict")
def main():
    data = request.json['text']
    print("data")
    result = predict_tags(data)
    print(result)
    return result

if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0')
