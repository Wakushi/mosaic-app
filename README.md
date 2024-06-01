# Mosaic - Chainlink Block Magic Hackathon submission

## Team

- [Camillemtd](https://github.com/Camillemtd): Fullstack Typescript and ThreeJS developer

- [Wakushi](https://github.com/Wakushi): Blockchain developer

## Inspiration

The inspiration for Mosaic comes from observing the **inefficiencies** and **barriers** in the traditional art market. Transactions often take multiple days and involve significant **counterparty risks**, making **trust** a major issue. Additionally, many galleries still use outdated, inefficient methods like paper records or deprecated software to manage assets, leading to further inefficiencies.

We also saw a need for **greater liquidity and transparency** in the art market. The lack of transaction auditability slows art **history** and **traceability**, which blockchain can significantly improve. Additionally, the high value of art pieces has historically restricted investment opportunities to a wealthy few. By enabling fractional ownership, Mosaic allows a **wider audience** to invest in valuable artworks, making art investment more **inclusive**.

On one side, asset managers have a deep connection with the **real world**, handling physical artworks and their associated complexities. On the other side, blockchain **oracle networks** and **smart contracts** offer a **new infrastructure** that represents value reliably and moves it across systems efficiently, without information asymmetry. This integration is crucial for managing the vast value in institutional entities more effectively.

Bringing all these pieces together, and inspired by the need for a more efficient, transparent, and inclusive system, we decided to create **Mosaic**.

## What it does

Mosaic is a dApp designed to **tokenize** and **fractionalize physical artworks**, making art investment more accessible and efficient. The certificate of authenticity or proof of ownership for art pieces has evolved from paper to digital, and the next step is moving to **reliable digital records**. To achieve this, we combine art appraisers’ monthly reporting with **Chainlink Functions** to securely bring report data on-chain. Galleries can register, create tokenization requests, and track the entire process through a dashboard. Investors can buy, sell, and manage tokenized art shares, enhancing liquidity and transparency. Mosaic leverages blockchain technology and Chainlink services to ensure **secure provenance verification**, **automated processes**, and **global accessibility**.

## How we built it

**Tools include** :

**Blockchain-Based Backend**: Utilizing Solidity, the Foundry framework, Chainlink libraries, Functions-Toolkit, and the OpenZeppelin library for ERC721 and ERC1155 standards. We selected Polygon Amoy for our contracts due to its low transaction and computation costs, as well as its high-speed network performance.

**Front-End / Back-end Development**: Implemented with NextJS, TypeScript, Wagmi and Viem libraries and Tailwind.

**Chainlink services**:

- [CCIP](https://github.com/Wakushi/mosaic-foundry/blob/ef24ecc9e292c8e759c547b6837d8c149dbd8b52/src/xChainAsset.sol#L129) to let work token owner transfer the asset cross-chain, and send cross-chain message back to the dWorkSharesManager contract bound to the work token even after it's been transferred.
- [Log-based](https://github.com/Wakushi/mosaic-foundry/blob/ef24ecc9e292c8e759c547b6837d8c149dbd8b52/src/dWork.sol#L153) and [time-based](https://github.com/Wakushi/mosaic-foundry/blob/ef24ecc9e292c8e759c547b6837d8c149dbd8b52/src/dWork.sol#L110) automation to enhance the efficiency of the work verification process, offloading some computation from Chainlink Functions callbacks, and conducting work verification every month or trimester effectively.
- [Functions](https://github.com/Wakushi/mosaic-foundry/blob/ef24ecc9e292c8e759c547b6837d8c149dbd8b52/src/WorkVerifier.sol#L181) to fetch, aggregate and compute data for multiple sources, combining the power of decentralized computing with gpt-4o vision and analyze abilities.
- [Data feeds](https://github.com/Wakushi/mosaic-foundry/blob/ef24ecc9e292c8e759c547b6837d8c149dbd8b52/src/dWorkSharesManager.sol#L250) for native to USD and USDC to USD on-chain conversions to provide accurate pricing for share buyers and to ensure fair redistribution when an artwork is sold.

We also used Pinata IPFS for decentralized storage of the certificate of authenticity scan and appraiser reports.

**The blockchain-based backend architecture is composed of 3 contracts:**

- **dWork.sol** is responsible for managing the overall tokenization process of artworks. It handles the creation of TokenizedWork struct objects, stores the initial data, and coordinates the various stages of tokenization. It interacts with WorkVerifier.sol to perform data verification and utilizes Chainlink’s log-based automation to streamline the workflow. Additionally, dWork.sol finalizes the tokenization process by registering the final data and minting the ERC721 NFTs that represent the artworks.

- **WorkVerifier.sol** is designed to handle the detailed verification of data related to the artworks. It performs Chainlink Function calls to the Chainlink Decentralized Oracle Network (DON) to extract and validate data from the certificates of authenticity and other relevant documents. WorkVerifier.sol stores the verified data and emits events that trigger further actions in the dWork.sol contract, ensuring the integrity and accuracy of the tokenization process.

- **dWorkSharesManager.sol** handles the minting and distribution of fractionalized work shares. It acts as the marketplace contract, providing methods to buy, list, and unlist shares. Additionally, dWorkSharesManager.sol is responsible for making the shares redeemable by burning them for their USDC value once the associated work NFT is sold on the dWork contract. This contract ensures that fractional ownership is efficiently managed and that investors can easily trade and redeem their shares.

**The tokenization process is orchestrated by the dWork and WorkVerifier contracts:**

- The user **submits a work tokenization request** on the frontend.

- An **art expert meets the user** to verify the artwork, create a report, and scan the certificate of authenticity, uploading both to IPFS.

- Once the **report and certificate** are ready, the app admin initiates the tokenization process by calling _openTokenizationRequest_ on the dWork.sol contract. This creates a _TokenizedWork_ struct on-chain with initial data (IPFS hashes linked to the customer’s form, appraiser report, and certificate). It also sends a call to the **WorkVerifier.sol** contract using _sendCertificateExtractionRequest_.

- **WorkVerifier** receives the IPFS hash, performs a **Chainlink Function** call to the Chainlink DON, which fetches the image, processes it with **OpenAI’s GPT-4 Vision** to extract data, and sends the data back to WorkVerifier. WorkVerifier then stores the data and emits an event that triggers Chainlink log-based automation, calling _performUpkeep_ on dWork. Finally, dWork retrieves and stores the verified data from WorkVerifier.

- Once certificate data is extracted, the Mosaic admin can call _requestWorkVerification_ on dWork, which triggers another Chainlink Function call to the DON. This time, the **DON fetches and aggregates data from the appraiser report, customer submission, global art market, and join the previously certificate extracted data**. GPT-4o **organizes the data**, returns a JSON which we can use to **perform computation** to checks for discrepancies. If the data matches, the DON returns the price and owner information to WorkVerifier via _fulfillRequest_, and the contract emits an event, triggering _performUpkeep_ on dWork again.
  Finally, dWork finalizes the tokenization by **registering the data** and **minting** the ERC721 NFT representing the artwork.

**Tokenization process sequence**

![Sequence diagram for Mosaic tokenization process](https://i.imgur.com/2mkmJdY.png)

**Notes**: For the purpose of this PoC, we created a mocked API call for the art expert report and we used a combinaison of satori and sharp to dynamically generate certificates of authenticity we could upload to IPFS in order to automate and test the whole process. Also in the last days of the hackathon when we made the final deploy we had issues registering a new upkeep ([it still pending as I write](https://automation.chain.link/polygon-amoy/0x6f83142fa02ad074b3d88ccc399bb1a30870082504dbc97768a89720f6b2a96a), this is why we added a manual 'performUpkeep' button in the admin dashboard until this is resolved).

## Challenges we encountered

A significant challenge was **ensuring accurate and secure provenance verification** using blockchain and AI. Integrating **multiple data sources**, such as appraiser reports and market data, and automating the verification process required **careful design and testing**. The most difficult part was balancing all actors in the verification process, crafting the perfect prompt, and **determining the optimal amount of data** to provide (considering OpenAI API’s prompt size limitations) and output (as we often hit the Functions gas limit). It took numerous attempts to find the ideal balance between sufficient data and data overload.

Another challenge was developing a **user-friendly** interface that simplifies complex processes like tokenization and fractionalization for galleries and investors. Ensuring compliance with **legal standards** for asset tokenization also posed difficulties, as tokenizing a physical asset must consider legal aspects ([Patrick Collins's words on this issue](https://youtu.be/bH4cwAtqRx4?t=95)). This is why after some research we decided to adopt for an hybrid model that combines [Rooftop onchain](https://roofstock-onchain.gitbook.io/learn-about-roofstock-onchain/guides/how-it-works/legal-ownership#the-home-onchain-llcs) and [Masterworks](https://www.masterworks.com/) methods, creating a LLC for each work, transferring the ownership to that LLC and binding the LLC's ownership to the ERC721 and ERC1155 contracts.

## Accomplishments

We are proud to have developed a platform that **democratizes art investment** and **enhances market efficiency**. We are particularly proud of our integration of **Chainlink Functions**, **log-based automation**, and the **latest OpenAI models** to fetch, analyze, and compute large volumes of data in an automated, decentralized, and unbiased manner. We also had the chance to talk with some amazing **art appraisers** to get more **accurate understanding of the pain points** they face and we feel like this project allowed us to contribute meaningfully to the art and blockchain communities.

## What we learned

We realized that the entire asset management industry is heading for **transformative change**, as the ability to tokenize art suggests that every asset can eventually be tokenized and fractionalized.
On the building side, we learned to leverage Chainlink Functions and OpenAI’s GPT-4 Vision for secure data extraction and on-chain registration.
This project enhanced our understanding of contract architecture and blockchain integration, emphasizing the importance of security and efficiency.
This hackathon pushed us to deepen our understanding of essential tools for our project, including Foundry, Chainlink Functions, and Next.js. It also highlighted the critical importance of tools like Tenderly and Remix in our development process. There's no other place to learn this much and we're really excited for the next challenges to come.

## What’s Next for Mosaic

**Future enhancements for Mosaic could include:**

- A multiple appraiser report management for a single work to ensure data validity
- CCIP system where the shares tokens could also be sent anywhere and still be aware of when their associated work token is sold. (Currently this process is only integrated for the tokenized works).
- Introducing the option for clients to delegate the decision of selling the artwork to a DAO composed of token holders associated with the artwork.
- Enabling galleries to authenticate using account abstraction for enhanced security and user experience.
- Implementing analysis and reading of LLC documents and artwork ownership certificates using OpenAI and Chainlink Functions to generate a JSON with key information.
- Developing a Progressive Web App (PWA) that allows gallery visitors to take photos of artworks and capture their geolocation to verify the artwork’s condition and location, with incentives such as a lottery to win prizes.
