# Authenticaster 

Authenticaster is a Farcaster-based application, which uses the zero knowledge proofs to check authenticity and credibility.

Currently under construction. Stay tuned!!

# what the authenticaster ratings mean  
Scores are given out of 10.  
10: The project and the launcher appear to have the highest possible level of credibility  and there is a lot of attention being received by the project.  Such project have the highest likelihood of being authentic.  
8-9: The project and the launcher have high credibility but the interest in the project needs to be gauged for a longer period before coming to a concrete conclusion. Alternately, there is a lot of interest in the project but the launcher or the project have a medium level credibility score.  Such projects have a high probability of being authentic.  
6-7: The project and the launcher have medium credibility rating along with the project receiving moderate public interest. Alternately, the project or the launcher have a poor credibility score but the project has gained significant attention, or the project lacks much hype, but the launcher and the project have a very high credibility score.  Such projects have nearly an equal likelohood of being or not being authentic.  
3-5: The project has received very low attention, and the launcher and the project have a medium credibility score. Alternatively, the project has received moderate attention, but the launcher or the project have a low credibility score. Such projects have a lower probability of being legitimate.  
0-4: The project hasn't generated much hype at all, and the project and the launcher (usually both) have a low credibility score. Financially engaging with such a project should be done at ones own risk.

# updated to-do  
1. the far.quest query fetches the connectedAddress for given fid, use that in axios.get(url) where url = 'https://etherscan.io/address/'.concat(connectedAddress)  
2. in that axios.get, use cheerio selector to get the text of the first transaction hash, say t_hash   
3. do an axios.get(url2) where url2 = 'https://etherscan.io/getRawTx?tx='.concat(t_hash)  
4. fetch the resulting value  
5. do an axios.get for https://toolkit.abdk.consulting/ethereum#recover-address  
6. make the scraper click the radio button for transaction (possible?)  
7. fetch the public key value from the result
