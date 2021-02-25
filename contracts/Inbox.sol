pragma solidity ^0.4.17;

contract Inbox {
  
  string public message;

  // a function with the same name as the contract are is a constructor function
  // initalizes with 'initialMessage' in the inbox
  function Inbox(string initialMessage) public {
    message = initialMessage;
  }

  // another function can modify the message in the inbox
  function setMessage(string newMessage) public {
    message = newMessage;
  }
}
