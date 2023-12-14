from flask import Flask,render_template

app=Flask(__name__);
@app.route("/")
def hello():
    return render_template('index.html')



@app.route("/contact")
def contact():
    return render_template('contact.html')


@app.route("/about")
def about():
    return "hello this  is about page"

app.run(debug=True)
