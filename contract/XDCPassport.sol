// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;
//0xc1C96E953639b0412A71aA1ecEe6cbA53f637cF0
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/Base64.sol";
contract ChainBattles is ERC721URIStorage  {
    using Strings for uint256;
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    struct data{
        uint256 level;
        string userId;
        }

    mapping(uint256 => data) public tokenIdToLevels;
mapping(address => uint256) public userId;
    constructor() ERC721 ("Lens Phite v2", "LPV2"){
    }
function generateCharacter(uint256 tokenId) public returns(string memory){

    bytes memory svg = abi.encodePacked(
        '<svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMinYMin meet" viewBox="0 0 350 350">',
        '<style>.base { fill: white; font-family: serif; font-size: 14px; }</style>',
        '<rect width="100%" height="100%" fill="black" />',
        '<text x="50%" y="40%" class="base" dominant-baseline="middle" text-anchor="middle">',"Lens~XDC Phite",'</text>',
        '<text x="50%" y="50%" class="base" dominant-baseline="middle" text-anchor="middle">', "Lens ID : ",getId(tokenId),'</text>',
        '<text x="50%" y="60%" class="base" dominant-baseline="middle" text-anchor="middle">', "Total Wins : ",getLevels(tokenId),'</text>',
        
        '</svg>'
    );
    return string(
        abi.encodePacked(
            "data:image/svg+xml;base64,",
            Base64.encode(svg)
        )    
    );
}

function getLevels(uint256 tokenId) public view returns (string memory) {
    uint256 levels = tokenIdToLevels[tokenId].level;
    return levels.toString();
}

function getId(uint256 tokenId) public view returns (string memory) {
    string memory levels = tokenIdToLevels[tokenId].userId;
    return levels;
}


function getTokenURI(uint256 tokenId) public returns (string memory){
    bytes memory dataURI = abi.encodePacked(
        '{',
            '"name": "Lens Phite #', tokenId.toString(), '",',
            '"description": "Battles on chain",',
            '"image": "', generateCharacter(tokenId), '"',
        '}'
    );
    return string(
        abi.encodePacked(
            "data:application/json;base64,",
            Base64.encode(dataURI)
        )
    );
}

function mintMyNft() public {
    _tokenIds.increment();
    uint256 newItemId = _tokenIds.current();
    _safeMint(msg.sender, newItemId);
    tokenIdToLevels[newItemId].level = 0;
    userId[msg.sender] = newItemId;
    _setTokenURI(newItemId, getTokenURI(newItemId));
}

function mintOtherNft(address _p2) public {
    _tokenIds.increment();
    uint256 newItemId = _tokenIds.current();
    _safeMint(_p2, newItemId);
    tokenIdToLevels[newItemId].level = 0;
    userId[_p2] = newItemId;
    _setTokenURI(newItemId, getTokenURI(newItemId));
}

function train() public {
    uint256 tokenId = userId[msg.sender];
    require(_exists(tokenId), "Please use an existing token");
    require(ownerOf(tokenId) == msg.sender, "You must own this token to train it");
    uint256 currentLevel = tokenIdToLevels[tokenId].level;

    tokenIdToLevels[tokenId].level = currentLevel + 1;
    _setTokenURI(tokenId, getTokenURI(tokenId));
}

function trainop(address _user,string memory _id) public {
 uint256 tokenId = userId[_user];
    require(_exists(tokenId), "Please use an existing token");
   // require(ownerOf(tokenId) == msg.sender, "You must own this token to train it");
    if(tokenIdToLevels[tokenId].level == 0){
    uint256 currentLevel = tokenIdToLevels[tokenId].level;
    tokenIdToLevels[tokenId].userId = _id;
    tokenIdToLevels[tokenId].level = currentLevel + 1;
    _setTokenURI(tokenId, getTokenURI(tokenId));
    }else{
            uint256 currentLevel = tokenIdToLevels[tokenId].level;
    tokenIdToLevels[tokenId].level = currentLevel + 1;
    _setTokenURI(tokenId, getTokenURI(tokenId));
    }

}


}