import { databases } from "../../src/AppwriteConfig";
import { Query } from "appwrite";
import { DatabasesId } from "../../src/appwriteAllid";
const databaseId=DatabasesId

export const addDocument = async (collectionId, data) => {
  try {
    const response = await databases.createDocument(
      databaseId, 
      collectionId, 
      'unique()', // Generates a unique document ID
      data
    );
    // console.log('Document Added:', response);
    return "Document Added"
 
  } catch (error) {
    console.error('Error Adding Document:', error);
    return error
  }
};

export const addAddmistion = async (collectionId, data) => {
  try {
    // let slNo = "1";
    const existingDocuments = await databases.listDocuments(
      databaseId, 
      collectionId,
      [
        // Query for matching stuUAN or stuRankNo
        Query.equal('stuSemester', data.stuSemester),
       
      ]
    );

    if (existingDocuments.total > 0) {
      return "This Semester Already Exists."; // Clear user-friendly messag
      // throw new Error('Student UAN No. Already Exists.');
    }


    // const sortedDocuments = existingDocuments.documents.sort((a, b) => {
    //   // Compare stuRankNo as strings, converting them to numbers for comparison
    //   return parseInt(b.slNo) - parseInt(a.slNo);
    // });

    // // Increment the highest stuRankNo (parse it as a number first)
    // slNo = (parseInt(sortedDocuments[0].slNo) + 1).toString(); // Convert back to string


  

    const response = await databases.createDocument(
      databaseId, 
      collectionId, 
      'unique()', // Generates a unique document ID
      data
    );
    // console.log('Document Added:', response);
    return "Document Added Successfully";  // Success message

 
  } catch (error) {
    console.log(error)
    return `Error: ${error.message || 'An error occurred while adding the document.'}`;
  }
};


export const addStudentDocument = async (collectionId, data) => {
  try {
    // Check if a document with the same stuUAN or stuRankNo already exists
    const existingDocuments = await databases.listDocuments(
      databaseId, 
      collectionId,
      [
        // Query for matching stuUAN or stuRankNo
        Query.equal('stuUAN', data.stuUAN),
       
      ]
    );

    if (existingDocuments.total > 0) {
      throw new Error('Student UAN No. Already Exists.');
    }

    // If no duplicates, create the new document
    const response = await databases.createDocument(
      databaseId,
      collectionId,
      'unique()', // Auto-generate unique document ID
      data
    );

    console.log('Document Added:', response);
    return "Document Added";
  } catch (error) {
    // Show error message on two lines
    console.error('Error Adding Document:');
    console.error(error.message);
    return error.message;
  }
};



export const getDocuments = async (collectionId) => {
    try {
      const response = await databases.listDocuments(databaseId, collectionId);
      // console.log('Documents:', response.documents);
      return response.documents;
    } catch (error) {
        console.error('Error Fetching Documents:', error);
        return error
     
    }
  };
  
  export const updateDocument = async (collectionId, documentId, data) => {
    try {
      const response = await databases.updateDocument(databaseId, collectionId, documentId, data);
      // console.log('Document Updated:', response);
      return "Document Updated";
    } catch (error) {
        console.error('Error Updating Document:', error);
        return error
    
    }
  };

  export const deleteDocument = async (collectionId, documentId) => {
    try {
      await databases.deleteDocument(databaseId, collectionId, documentId);
      return "Document Deleted"
    } catch (error) {
      throw new Error('Invalid credentials');
    }
  };




  export const loginAdmin = async (collectionId, userId, password) => {
    try {
        // Fetch the user document from the collection based on the userId
        const response = await databases.listDocuments(databaseId, collectionId, [
          Query.equal('userId', userId) // Match by userId
        ]);
    
        // Check if no user was found with the provided userId
        if (response.documents.length === 0) {
          return "User not found"
        }
    
        const user = response.documents[0];
    
        // Here you should compare hashed passwords (e.g., bcrypt) in a real app
        if (user.password === password) {
          // console.log('Login Successful:', user);
          return "Login Successful"; // Return user data if login is successful
        } else {
          return "Invalid credentials"// Invalid password
        }
      } catch (error) {
        // Handle different types of errors
        if (error.message === 'User not found') {
          return "User not found"
        } else if (error.message === 'Invalid credentials') {
          return "Invalid credentials"
        } else {
           return " Logging In Error"
        }
        throw error; // Re-throw the error for further handling
      }
  };
  

  export const loginStudent = async (collectionId, stuUAN, password) => {
    try {
        // Fetch the user document from the collection based on the userId
        const response = await databases.listDocuments(databaseId, collectionId, [
          Query.equal('stuUAN', stuUAN) // Match by userId
        ]);
    
        // Check if no user was found with the provided userId
        if (response.documents.length === 0) {
          return "User not found"
          // throw new Error('User not found');
        }
    
        const user = response.documents[0];
        // console.log("user",user)
        // Here you should compare hashed passwords (e.g., bcrypt) in a real app
        if (user.stuPassword === password) {
          // console.log('Login Successful:', user);
          return "Login Successful"; // Return user data if login is successful
        } else {
          return "Invalid credentials"
          // throw new Error('Invalid credentials'); // Invalid password
        }
      } catch (error) {
        // Handle different types of errors
        if (error.message === 'User not found') {
          return "User not found"
          // console.error('Error: User not found');
        } else if (error.message === 'Invalid credentials') {
          return "Invalid credentials"
          // console.error('Error: Invalid credentials');
        } else {
          return " Logging In Error"
          // console.error('Error Logging In:', error.message);
        }
        // Re-throw the error for further handling
      }
  };
  



  export const getDocumentsById = async (collectionId,fieldName,fieldData) => {
    try {
      const response = await databases.listDocuments(databaseId, collectionId, [
        Query.equal(fieldName, fieldData) // Match by userId
      ]);
  
      // console.log('Documents:', response.documents);
      return response.documents;
    } catch (error) {
        console.error('Error Fetching Documents:', error);
        return error
     
    }
  };


  export const getDocumentsAllDataTwo = async (collectionId1, collectionId2) => {
    try {
      // Fetch documents from both collections
      const response1 = await databases.listDocuments(databaseId, collectionId1);
      const response2 = await databases.listDocuments(databaseId, collectionId2);
  
      const data1 = response1.documents || [];
      const data2 = response2.documents || [];
  
      // Create a map for the first dataset keyed by stuUAN
      const data1Map = data1.reduce((map, item) => {
        map[item.stuUAN] = item; // Use stuUAN as the key
        return map;
      }, {});
  
      // Filter and merge only matching items
      const mergedResponse = data2
        .filter(item => data1Map[item.stuUAN]) // Include only items with matching stuUAN
        .map(item => {
          // Merge matching objects
          return { ...data1Map[item.stuUAN], ...item };
        });
  
      return mergedResponse;
    } catch (error) {
      console.error('Error Fetching Documents:', error);
      return error;
    }
  };
  

