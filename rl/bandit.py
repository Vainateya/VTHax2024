import math
import numpy as np

index = {
    'ACS Surgery Principles and Practices.pdf': 0,
    'MayoClinic Preparing For Your Surgery or Procedure.pdf': 1,
    'NOMESCO Classification of Surgical Procedures.pdf': 2
}

N_ARMS = len(index) # number of sources

class UCBAgent():
    def __init__(self, c, k=N_ARMS):
        self.k = k
        self.c = c
        self.q = [0] * k
        self.n = [0] * k
        self.t = 1

    def calculate_ucb(self, a):
        if self.n[a] == 0:
            return 10_000
        return self.q[a] + self.c * math.sqrt(math.log(self.t) / self.n[a])
    
    def get_weights(self): # returns numpy array of weights - normalized from 0 to 1
        ucbs = [self.calculate_ucb(a) for a in range(self.k)]
        ucbs = np.array(ucbs)
        ucbs /= ucbs.max()
        return {name: score for name, score in zip(index.keys(), ucbs)}
    
    def learn(self, source, reward):
        action = index[source]
        self.n[action] += 1
        self.t += 1
        lr = 1.0 / self.n[action]
        self.q[action] += lr * (reward - self.q[action])