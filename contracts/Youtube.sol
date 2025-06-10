// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "hardhat/console.sol";

contract Youtube {
    string public textRaw;
    address private owner;
    uint256 public angka;

    event PesanDiubah(address indexed pengubah, string pesanBaru, uint256 timestamp);

    constructor() {
        owner = msg.sender;
        console.log("Kontrak Youtube dideploy oleh:", owner);
    }

    function setText(string calldata _text) external {
        // Hanya untuk contoh, bisa ditambahkan require(msg.sender == owner);
        // jika hanya pemilik yang boleh mengubah.
        textRaw = _text;
        emit PesanDiubah(msg.sender, _text, block.timestamp);
    }

    function inc() external {
        require(msg.sender == owner, "Hanya pemilik yang dapat menjalankan fungsi ini");
        angka++;
    }

    function getPemilik() public view returns (address) {
        return owner;
    }
}
