import { databases } from "../../src/AppwriteConfig";
import { Query } from "appwrite";

const databaseId="6762defc00355f696a04"

export const addDocument = async (collectionId, data) => {
  try {
    const response = await databases.createDocument(
      databaseId, 
      collectionId, 
      'unique()', // Generates a unique document ID
      data
    );
    console.log('Document Added:', response);
    return "Document Added"
 
  } catch (error) {
    console.error('Error Adding Document:', error);
    return error
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
      console.log('Document Updated:', response);
      return response;
    } catch (error) {
        console.error('Error Updating Document:', error);
        return error
    
    }
  };

  export const deleteDocument = async (collectionId, documentId) => {
    try {
      await databases.deleteDocument(databaseId, collectionId, documentId);
      console.log('Document Deleted');
    } catch (error) {
      console.error('Error Deleting Document:', error);
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
          throw new Error('User not found');
        }
    
        const user = response.documents[0];
    
        // Here you should compare hashed passwords (e.g., bcrypt) in a real app
        if (user.password === password) {
          // console.log('Login Successful:', user);
          return "Login Successful"; // Return user data if login is successful
        } else {
          throw new Error('Invalid credentials'); // Invalid password
        }
      } catch (error) {
        // Handle different types of errors
        if (error.message === 'User not found') {
          console.error('Error: User not found');
        } else if (error.message === 'Invalid credentials') {
          console.error('Error: Invalid credentials 123');
        } else {
          console.error('Error Logging In:', error.message);
        }
        throw error; // Re-throw the error for further handling
      }
  };
  