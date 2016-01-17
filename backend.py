from flask import Flask, current_app, request, jsonify
from pymongo import MongoClient
app = Flask(__name__)

client = MongoClient()      # make connection
db = client['testdb']       # get database
collection = db['testdb']   # get collection


with app.app_context():
    # within this block, current_app points to app.
    print(current_app.name)

@app.route('/')
def root():
    return app.send_static_file('index.html')

# # test code
# @app.route('/mappage')
# def map_page():
#     return 'Map of Rice goes here.'


# @app.route('/submit', methods=['POST','GET'])
# def handle_submit(): 
#     print("MY MUM IS A CONSOLE")
#     print(str(request))
#     print(str(request.form))

#     details = request.form

#     name = details['name']
# #    category = details['category']
# #    start_time = details['start_time']
#  #   end_time = details['end_time']
#   #  description = details['description']
    
#     json = {'name': name}
#  #               'category': category,
#   #              'start_time': start_time,
#    #             'end_time': end_time,
#     #            'description': description}

#     db.testdb.insert_one(json)
#     return str(json)
#     #return json.dumps(json)
#     #print jsonify(json), type(jsonify(json))
#     #return jsonify(json)


# # handles form submission
# #@app.route('/submit', methods=['POST'])
# #def handle_submit():
# #    # save the data
# #    #info = form.storedoc()
# #    info = insertdoc() 
# #    # user sees "thank you for submitting"
# #    return

# def retrieve_document():
#     # search must be in (key: value) format, a drop down menu and a 4-field form
#     searchterm = request.form
#     name = searchterm['Name']
#     category = searchterm['Category']
#     start = searchterm['Start_time']
#     end = searchterm['End_time']
#     description = searchterm['Location']
#     db.testdb.find({'name': name},
#                           {'category': category},
#                           {'start': start},
#                           {'end': end},
#                           {'description': description})

app.run(debug = True)


    
