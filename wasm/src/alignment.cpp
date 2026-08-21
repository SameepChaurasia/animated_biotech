#include "alignment.h"
#include <algorithm>
#include <cmath>

SequenceAligner::SequenceAligner(int match, int mismatch, int gap)
    : match_score(match), mismatch_penalty(mismatch), gap_penalty(gap) {}

AlignmentOutput SequenceAligner::global_align(const std::string& seq1, const std::string& seq2) {
    int n = static_cast<int>(seq1.length());
    int m = static_cast<int>(seq2.length());

    std::vector<std::vector<int>> dp(n + 1, std::vector<int>(m + 1, 0));
    std::vector<std::vector<int>> trace(n + 1, std::vector<int>(m + 1, 0));

    for (int i = 1; i <= n; ++i) {
        dp[i][0] = i * gap_penalty;
        trace[i][0] = 2; // Up
    }
    for (int j = 1; j <= m; ++j) {
        dp[0][j] = j * gap_penalty;
        trace[0][j] = 3; // Left
    }

    for (int i = 1; i <= n; ++i) {
        for (int j = 1; j <= m; ++j) {
            int match = dp[i - 1][j - 1] + (seq1[i - 1] == seq2[j - 1] ? match_score : mismatch_penalty);
            int del = dp[i - 1][j] + gap_penalty;
            int ins = dp[i][j - 1] + gap_penalty;

            int best = match;
            int dir = 1; // Diagonal

            if (del > best) {
                best = del;
                dir = 2;
            }
            if (ins > best) {
                best = ins;
                dir = 3;
            }

            dp[i][j] = best;
            trace[i][j] = dir;
        }
    }

    std::string al1 = "";
    std::string al2 = "";
    std::string ml = "";

    int curr_i = n;
    int curr_j = m;

    while (curr_i > 0 || curr_j > 0) {
        int dir = trace[curr_i][curr_j];
        if (dir == 1 || (curr_i > 0 && curr_j > 0 && dir == 0)) {
            char c1 = seq1[curr_i - 1];
            char c2 = seq2[curr_j - 1];
            al1 = c1 + al1;
            al2 = c2 + al2;
            ml = (c1 == c2 ? "|" : ".") + ml;
            curr_i--;
            curr_j--;
        } else if (dir == 2 || curr_j == 0) {
            al1 = seq1[curr_i - 1] + al1;
            al2 = "-" + al2;
            ml = " " + ml;
            curr_i--;
        } else {
            al1 = "-" + al1;
            al2 = seq2[curr_j - 1] + al2;
            ml = " " + ml;
            curr_j--;
        }
    }

    int matches = 0;
    int gaps = 0;
    for (size_t k = 0; k < ml.length(); ++k) {
        if (ml[k] == '|') matches++;
        if (al1[k] == '-' || al2[k] == '-') gaps++;
    }

    double identity = al1.length() > 0 ? (static_cast<double>(matches) / al1.length()) * 100.0 : 0.0;

    AlignmentOutput out;
    out.aligned_seq1 = al1;
    out.aligned_seq2 = al2;
    out.match_line = ml;
    out.score = dp[n][m];
    out.identity_percent = identity;
    out.gaps = gaps;

    return out;
}
