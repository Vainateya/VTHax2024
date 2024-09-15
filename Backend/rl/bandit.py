import math
import numpy as np

class UCBAgent():
    def __init__(self, sources, c=math.sqrt(2)):
        self.sources = sources
        self.N_ARMS = len(self.sources)
        self.c = c
        self.q = [0] * self.N_ARMS
        self.n = [0] * self.N_ARMS
        self.t = 1
        

    def calculate_ucb(self, a):
        if self.n[a] == 0:
            return 10_000
        return self.q[a] + self.c * math.sqrt(math.log(self.t) / self.n[a])
    
    def get_weights(self): # returns numpy array of weights - normalized from 0 to 1
        ucbs = [self.calculate_ucb(a) for a in range(self.N_ARMS)]
        ucbs = np.array(ucbs)
        ucbs = ucbs / ucbs.max()
        return {name: score for name, score in zip(self.sources.keys(), ucbs)}
    
    def learn(self, source, reward):
        action = self.sources[source]
        self.n[action] += 1
        self.t += 1
        lr = 1.0 / self.n[action]
        self.q[action] += lr * (reward - self.q[action])